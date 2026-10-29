/* Maghreb Estates intranet: gedeelde helpers (portaal, opmaak, koers, export). */
(function () {
  // ── Wachtwoordportaal ───────────────────────────────────────────────────
  // Let op: dit is een drempel aan de voorkant, geen echte beveiliging.
  // Zet hier nooit klantdossiers, sleutels of andere gevoelige data achter.
  const PASSWORD = 'Test123';
  const KEY = 'me-intranet-auth';

  function store(kind) { try { return window[kind]; } catch (e) { return null; } }
  function get(k) {
    for (const s of [store('sessionStorage'), store('localStorage')]) {
      try { const v = s && s.getItem(k); if (v != null) return v; } catch (e) {}
    }
    return null;
  }
  function authed() { return get(KEY) === '1' || window.__meAuth === true; }

  function showGate() {
    document.body.classList.add('locked');
    const g = document.createElement('div');
    g.id = 'gate';
    const logo = (document.querySelector('meta[name=me-root]') || {}).content || '';
    g.innerHTML = `
      <form class="box" autocomplete="off">
        <img src="${logo}assets/logo-licht.png" alt="Maghreb Estates">
        <span class="lbl">Intranet · alleen voor het team</span>
        <input type="password" id="gatePw" placeholder="Wachtwoord" aria-label="Wachtwoord" autofocus>
        <button class="btn" type="submit">Inloggen</button>
        <label class="rem"><input type="checkbox" id="gateRem"> Onthoud mij op dit apparaat</label>
        <div class="err" id="gateErr"></div>
      </form>`;
    document.body.prepend(g);
    g.querySelector('form').addEventListener('submit', e => {
      e.preventDefault();
      const pw = g.querySelector('#gatePw');
      if (pw.value === PASSWORD) {
        window.__meAuth = true;
        const s = g.querySelector('#gateRem').checked ? store('localStorage') : store('sessionStorage');
        try { s && s.setItem(KEY, '1'); } catch (err) {}
        g.remove();
        document.body.classList.remove('locked');
        document.dispatchEvent(new Event('me:unlocked'));
      } else {
        g.querySelector('#gateErr').textContent = 'Onjuist wachtwoord';
        g.querySelector('.box').classList.remove('shake'); void g.offsetWidth;
        g.querySelector('.box').classList.add('shake');
        pw.value = ''; pw.focus();
      }
    });
    setTimeout(() => { const i = g.querySelector('#gatePw'); i && i.focus(); }, 50);
  }

  function logout() {
    for (const s of [store('sessionStorage'), store('localStorage')]) { try { s && s.removeItem(KEY); } catch (e) {} }
    window.__meAuth = false;
    location.href = ((document.querySelector('meta[name=me-root]') || {}).content || '') + 'index.html';
  }

  // ── Opmaak ──────────────────────────────────────────────────────────────
  const nf0 = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });
  const nf2 = new Intl.NumberFormat('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const nf1 = new Intl.NumberFormat('nl-NL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const fmt = n => (isFinite(n) ? nf0.format(Math.round(n)) : '–');
  const mad = n => 'MAD ' + fmt(n);
  const eur = n => '€ ' + fmt(n);
  const pct = (n, d = 1) => (isFinite(n) ? (d === 2 ? nf2 : nf1).format(n) + '%' : '–');

  /** "1.250.000", "1,4", "2 000" → getal (NL-notatie: punt = duizendtal, komma = decimaal). */
  function num(v) {
    if (typeof v === 'number') return v;
    v = String(v || '').trim().replace(/\s|MAD|€|%/gi, '');
    if (!v) return 0;
    if (v.includes(',')) v = v.replace(/\./g, '').replace(',', '.');
    else if (/^\d{1,3}(\.\d{3})+$/.test(v)) v = v.replace(/\./g, '');
    const n = parseFloat(v);
    return isFinite(n) ? n : 0;
  }
  /** Bedragveld: toont duizendtallen met punten terwijl je typt. */
  function money(input) {
    input.setAttribute('inputmode', 'numeric');
    input.addEventListener('input', () => {
      const raw = input.value.replace(/[^\d]/g, '');
      const pos = input.value.length - input.selectionStart;
      input.value = raw ? nf0.format(+raw) : '';
      const p = Math.max(0, input.value.length - pos);
      try { input.setSelectionRange(p, p); } catch (e) {}
    });
    if (input.value) input.value = nf0.format(num(input.value));
  }

  // ── Wisselkoers EUR → MAD (gratis bron, met cache en terugval) ─────────
  const FX_FALLBACK = 10.95;
  async function fxRate() {
    const ls = store('localStorage');
    try {
      const c = JSON.parse(ls.getItem('me-fx') || 'null');
      if (c && Date.now() - c.t < 6 * 3600e3) return c;
    } catch (e) {}
    try {
      const r = await fetch('https://open.er-api.com/v6/latest/EUR');
      const d = await r.json();
      const o = { rate: d.rates.MAD, t: Date.now(), live: true };
      try { ls.setItem('me-fx', JSON.stringify(o)); } catch (e) {}
      return o;
    } catch (e) {
      return { rate: FX_FALLBACK, t: Date.now(), live: false };
    }
  }
  let FX = FX_FALLBACK;
  const fxReady = fxRate().then(o => { FX = o.rate; return o; });

  // ── Export ──────────────────────────────────────────────────────────────
  function printEl(el) {
    document.querySelectorAll('.printable').forEach(x => x.classList.remove('printable'));
    el.classList.add('printable');
    document.body.classList.add('print-sheet');
    const done = () => { document.body.classList.remove('print-sheet'); window.removeEventListener('afterprint', done); };
    window.addEventListener('afterprint', done);
    window.print();
  }
  function loadScript(src) {
    return new Promise((res, rej) => {
      if (document.querySelector(`script[src="${src}"]`)) return res();
      const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = rej; document.head.appendChild(s);
    });
  }
  async function pngEl(el, name) {
    try {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
      const c = await window.html2canvas(el, { scale: 2, backgroundColor: '#ffffff', useCORS: true });
      const a = document.createElement('a'); a.download = name + '.png'; a.href = c.toDataURL('image/png'); a.click();
    } catch (e) { toast('Afbeelding maken lukt niet in deze browser. Gebruik PDF.'); }
  }
  function toast(msg) {
    let t = document.querySelector('.toast');
    if (!t) { t = document.createElement('div'); t.className = 'toast'; document.body.appendChild(t); }
    t.textContent = msg; t.classList.add('on');
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove('on'), 2200);
  }
  async function copy(text) {
    try { await navigator.clipboard.writeText(text); toast('Gekopieerd'); }
    catch (e) {
      const ta = document.createElement('textarea'); ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); toast('Gekopieerd'); } catch (er) { toast('Kopiëren lukt niet'); }
      ta.remove();
    }
  }
  const wa = text => window.open('https://wa.me/?text=' + encodeURIComponent(text), '_blank', 'noopener');

  // Bewaarde gegevens (per apparaat)
  const keep = {
    get(k, d) { try { const v = store('localStorage').getItem('me-' + k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { store('localStorage').setItem('me-' + k, JSON.stringify(v)); } catch (e) {} },
  };
  const today = () => new Date().toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' });
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  window.ME = { fmt, mad, eur, pct, num, money, fxReady, get fx() { return FX; }, printEl, pngEl, toast, copy, wa, keep, today, esc, logout, loadScript,
    contact: { naam: 'Maghreb Estates', mail: 'a.douider@maghreb-estates.com', web: 'maghreb-estates.com', tel: '+31 6 83 49 87 15', telMa: '+212 6 69 72 53 95' } };

  if (!authed()) {
    if (document.body) showGate(); else document.addEventListener('DOMContentLoaded', showGate);
  }
})();
