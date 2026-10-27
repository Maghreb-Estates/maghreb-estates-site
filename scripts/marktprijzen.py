"""Vraagprijzen per m² voor de verkooppagina (src/data/marktprijzen.json).

Leest de live listings-tabel in Supabase (alleen lezen), neemt de koopadvertenties
die bij de laatste scrapes nog online stonden en berekent per stad en per wijk de
mediane vraagprijs per m². De verkooppagina toont die cijfers als gewone HTML-tabel.

Gebruik (vanuit code/site/):
    python3 scripts/marktprijzen.py --env ../crm/.env

Of met SUPABASE_URL en SUPABASE_SERVICE_KEY als omgevingsvariabelen. Daarna de
JSON committen; de build leest alleen het bestand, nooit Supabase.

Regels, zodat de cijfers verdedigbaar blijven:
- Alleen vraagprijzen uit advertenties, nooit transactieprijzen. Dat staat er ook bij.
- Zelfde filter als het dashboard (withM2): 500 tot 150.000 MAD/m², oppervlak tot 10.000 m².
- Alleen advertenties in dirham; dubbele advertenties (zelfde stad, wijk, type,
  prijs en oppervlak) tellen één keer.
- Een stad/type-regel pas vanaf MIN_STAD advertenties, een wijk pas vanaf MIN_WIJK.
- Wijken alleen uit de vaste lijst hieronder, op exacte naam uit de database. De
  buurtnamen zijn vervuild; samenvoegen van spelvarianten wacht op de wijk-mapping.
"""

import argparse
import datetime as dt
import json
import os
import statistics
import sys
from collections import Counter
from pathlib import Path

import requests

PROJECT = 'pkkdjnxiperugvothjtn'  # live project; andere .env's wijzen soms elders heen
VENSTER_DAGEN = 10                # gelijk aan ACTIEF_DAGEN in het dashboard
MIN_STAD = 100
MIN_WIJK = 30

# Volgorde = volgorde op de pagina (gelijk aan werkgebied in src/i18n/verkopen.ts).
STEDEN = ['Rabat', 'Casablanca', 'Tanger', 'Marrakech', 'Agadir']
TYPES = {
    'appartement': ['apartment'],
    'villa': ['villa', 'house'],
}

# Wijken voor appartementen: naam in de database → naam op de pagina.
WIJKEN = {
    'Rabat': {'Agdal': 'Agdal', 'Riyad': 'Hay Riad', 'Souissi': 'Souissi'},
    'Casablanca': {
        'Maârif': 'Maârif', 'Gauthier': 'Gauthier', 'Racine': 'Racine', 'Ain Diab': 'Aïn Diab',
        'Les Hôpitaux': 'Les Hôpitaux', 'Belvédère': 'Belvédère', 'Oulfa': 'Oulfa',
    },
    'Tanger': {
        'Malabata': 'Malabata', 'Tanja Balia': 'Tanja Balia', 'Iberie': 'Ibéria',
        'Castilla': 'Castilla', 'Marjane': 'Marjane',
    },
    'Marrakech': {
        'Guéliz': 'Guéliz', 'Hivernage': 'Hivernage', 'Agdal': 'Agdal',
        'Camp Al Ghoul': 'Camp El Ghoul', 'Hay Targa': 'Targa', 'Mhamid': 'M’hamid',
    },
    'Agadir': {'Hay Mohammadi': 'Hay Mohammadi', 'Hay Salam': 'Hay Salam', 'Hay Houda': 'Hay Houda', 'Anza': 'Anza'},
}

BRONNEN = {'mubawab': 'Mubawab', 'sarouty': 'Sarouty', 'agenz': 'Agenz', 'avito': 'Avito'}


def lees_env(pad):
    env = {}
    for regel in Path(pad).read_text().splitlines():
        if '=' in regel and not regel.lstrip().startswith('#'):
            k, v = regel.split('=', 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    return env


def haal_op(url, key, vanaf):
    kop = {'apikey': key, 'Authorization': f'Bearer {key}'}
    rijen, start = [], 0
    while True:
        r = requests.get(
            f'{url}/rest/v1/listings',
            headers={**kop, 'Range': f'{start}-{start + 999}'},
            params={
                'select': 'source,city,neighborhood,price,price_currency,surface_m2,property_type,last_seen_at',
                'transaction_type': 'eq.sale',
                'city': f'in.({",".join(STEDEN)})',
                'last_seen_at': f'gte.{vanaf}',
                'order': 'id.asc',
            },
            timeout=60,
        )
        r.raise_for_status()
        blok = r.json()
        rijen += blok
        if len(blok) < 1000:
            return rijen
        start += 1000


def bruikbaar(r):
    opp, prijs = r['surface_m2'], r['price']
    if r['price_currency'] != 'MAD' or not opp or not prijs or opp <= 0 or opp > 10000:
        return False
    return 500 <= prijs / opp <= 150000


def kwartiel(waarden, p):
    s = sorted(waarden)
    return s[int(p * (len(s) - 1))]


def rond(x):
    return int(round(x / 100.0) * 100)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--env', help='pad naar een .env met SUPABASE_URL en SUPABASE_SERVICE_KEY')
    ap.add_argument('--uit', default=str(Path(__file__).resolve().parent.parent / 'src/data/marktprijzen.json'))
    args = ap.parse_args()

    env = lees_env(args.env) if args.env else os.environ
    url, key = env.get('SUPABASE_URL', ''), env.get('SUPABASE_SERVICE_KEY', '')
    if PROJECT not in url or not key:
        sys.exit(f'SUPABASE_URL moet naar het live project {PROJECT} wijzen en SUPABASE_SERVICE_KEY moet gevuld zijn.')

    # Ruim ophalen, daarna het venster laten aansluiten op de laatste scrape: zo geeft
    # een run een paar dagen na de scrape hetzelfde beeld.
    vanaf = (dt.datetime.now(dt.timezone.utc) - dt.timedelta(days=VENSTER_DAGEN + 14)).isoformat()
    rijen = haal_op(url, key, vanaf)
    if not rijen:
        sys.exit('Geen advertenties gevonden.')
    laatste = max(dt.datetime.fromisoformat(r['last_seen_at']) for r in rijen)
    grens = laatste - dt.timedelta(days=VENSTER_DAGEN)

    gezien, data = set(), []
    for r in rijen:
        if dt.datetime.fromisoformat(r['last_seen_at']) < grens or not bruikbaar(r):
            continue
        sleutel = (r['city'], (r['neighborhood'] or '').strip().lower(), r['property_type'],
                   round(r['price']), round(r['surface_m2']))
        if sleutel in gezien:
            continue
        gezien.add(sleutel)
        data.append(r)

    steden, totaal, bronnen = [], 0, Counter()
    for stad in STEDEN:
        rij = {'stad': stad, 'types': {}, 'wijken': []}
        for type_, ptypes in TYPES.items():
            sel = [r for r in data if r['city'] == stad and r['property_type'] in ptypes]
            if len(sel) < MIN_STAD:
                continue
            m2 = [r['price'] / r['surface_m2'] for r in sel]
            rij['types'][type_] = {
                'mediaan': rond(statistics.median(m2)),
                'p25': rond(kwartiel(m2, 0.25)),
                'p75': rond(kwartiel(m2, 0.75)),
                'n': len(sel),
            }
            totaal += len(sel)
            bronnen.update(r['source'] for r in sel)
        for db_naam, naam in WIJKEN[stad].items():
            m2 = [r['price'] / r['surface_m2'] for r in data
                  if r['city'] == stad and r['property_type'] == 'apartment' and r['neighborhood'] == db_naam]
            if len(m2) >= MIN_WIJK:
                rij['wijken'].append({'naam': naam, 'mediaan': rond(statistics.median(m2)), 'n': len(m2)})
        steden.append(rij)

    uit = {
        'bijgewerkt': laatste.date().isoformat(),
        'periode': {'van': grens.date().isoformat(), 'tot': laatste.date().isoformat()},
        'advertenties': totaal,
        'bronnen': [BRONNEN.get(b, b) for b, _ in bronnen.most_common()],  # grootste bron eerst
        'minWijk': MIN_WIJK,
        'steden': steden,
    }
    Path(args.uit).write_text(json.dumps(uit, ensure_ascii=False, indent=2) + '\n')
    print(f'{args.uit}: {totaal} advertenties, laatste scrape {uit["bijgewerkt"]}')
    for s in steden:
        typen = ', '.join(f'{k} {v["mediaan"]} (n={v["n"]})' for k, v in s['types'].items())
        print(f'  {s["stad"]}: {typen} · {len(s["wijken"])} wijken')


if __name__ == '__main__':
    main()
