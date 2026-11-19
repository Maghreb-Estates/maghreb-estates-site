/* Marktdata 2.0 — dashboard2
 * Alle statistiek komt uit de d2_*-functies in Supabase (code/dashboard-v2/supabase/migrations).
 * Deze pagina rekent zelf geen KPI's uit: ze toont, filtert en exporteert alleen.
 */
(() => {
  'use strict';

  // ------------------------------------------------------------------ config
  const CFG = window.D2_CONFIG || {};
  const API = (CFG.supabaseUrl || '').replace(/\/$/, '');
  const KEY = CFG.anonKey || '';
  const DEFAULTS = { transaction: 'sale', types: ['apartment'] };
  const TYPES = [
    ['apartment', 'Appartement'], ['villa', 'Villa'], ['house', 'Huis'], ['riad', 'Riad'], ['studio', 'Studio'],
    ['land', 'Grond'], ['commercial', 'Winkel/bedrijf'], ['office', 'Kantoor'], ['other', 'Overig'],
  ];
  const TYPE_NL = Object.fromEntries(TYPES);
  const SOURCES = [['agenz', 'Agenz'], ['mubawab', 'Mubawab'], ['avito', 'Avito']];
  const SOURCE_NL = Object.fromEntries(SOURCES);
  const SOURCE_COLOR = { agenz: '#2a78d6', mubawab: '#eb6834', avito: '#1baf7a' }; // vaste volgorde, gevalideerd (CVD)
  const FOCUS = ['casablanca', 'rabat', 'tanger', 'marrakech', 'agadir', 'nador', 'alhoceima'];
  const C = { green: '#1C2E1D', mid: '#34522e', light: '#a9c79a', accent: '#C4622D', muted: '#55685a', faint: '#8a9a8a', border: '#d8d1c4', grid: '#ece7db' };
  const RAMP = ['#dce8d4', '#a9c79a', '#6f9c5e', '#3f6b33', '#1C2E1D'];
  const URL_KEYS = { tx: 'transaction', city: 'city', nb: 'neighborhood', types: 'types', src: 'sources', pmin: 'min_price', pmax: 'max_price', amin: 'min_area', amax: 'max_area', bmin: 'min_bedrooms', bmax: 'max_bedrooms', bamin: 'min_bathrooms' };
  const NUM_INPUTS = { fPmin: 'min_price', fPmax: 'max_price', fAmin: 'min_area', fAmax: 'max_area', fBmin: 'min_bedrooms', fBmax: 'max_bedrooms', fBath: 'min_bathrooms' };

  // ------------------------------------------------------------------ state
  let F = {};
  let TAB = 'overview';
  let META = null;
  let CMP = ['city:casablanca', 'city:rabat', 'city:marrakech', 'city:tanger'];
  let mapMetric = 'median';
  let distMetric = 'unit';
  let lastData = {};
  let seq = 0;
  const charts = {};
  let map = null;
  let nbCache = { city: null, items: [] };

  // ------------------------------------------------------------------ helpers
  const $ = (s, el = document) => el.querySelector(s);
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const nf0 = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 0 });
  const nf1 = new Intl.NumberFormat('nl-NL', { maximumFractionDigits: 1, minimumFractionDigits: 1 });
  const fmt = (v, d = 0) => (v === null || v === undefined || v === '' || Number.isNaN(Number(v)) ? '–' : d === 0 ? nf0.format(Number(v)) : nf1.format(Number(v)));
  const fmtDate = (s) => (s ? new Date(s).toLocaleDateString('nl-NL', { day: 'numeric', month: 'long', year: 'numeric' }) : '–');
  const pct = (v) => (v === null || v === undefined ? '–' : `${nf1.format(Number(v))}%`);
  const compact = (v) => {
    if (v === null || v === undefined) return '–';
    const n = Number(v);
    if (Math.abs(n) >= 1e6) return `${nf1.format(n / 1e6)} mln`;
    return nf0.format(n);
  };
  const without = (f, ...keys) => { const g = { ...f }; keys.forEach((k) => delete g[k]); return g; };
  const unitLabel = () => (F.transaction === 'rent' ? 'MAD/m²/maand' : 'MAD/m²');
  const STATUS = {
    publishable: ['ok', 'publiceerbaar'], indicative: ['warn', 'indicatief'], insufficient: ['bad', 'onvoldoende'], empty: ['bad', 'geen data'],
    'voldoende gegevens': ['ok', 'voldoende gegevens'], 'beperkte gegevens': ['warn', 'beperkte gegevens'], 'onvoldoende gegevens': ['bad', 'onvoldoende gegevens'],
  };
  const badge = (s) => { if (!s) return ''; const [c, l] = STATUS[s] || ['', s]; return `<span class="badge ${c}">${esc(l)}</span>`; };
  const ciText = (u) => (u && u.ci95_low != null ? `${fmt(u.ci95_low)} – ${fmt(u.ci95_high)}` : '–');

  class ApiError extends Error {}
  async function rpc(fn, args, attempt = 1) {
    const headers = { 'Content-Type': 'application/json', apikey: KEY };
    if (KEY && !KEY.startsWith('sb_')) headers.Authorization = `Bearer ${KEY}`;
    const r = await fetch(`${API}/rest/v1/rpc/${fn}`, { method: 'POST', headers, body: JSON.stringify(args) });
    let j = null;
    try { j = await r.json(); } catch { /* leeg */ }
    // Koude database (gratis Supabase): eerste aanroep kan de tijdslimiet raken; één keer opnieuw proberen.
    if (!r.ok && j && j.code === '57014' && attempt === 1) return rpc(fn, args, 2);
    if (!r.ok) {
      const msg = (j && j.message) || `Fout ${r.status}`;
      throw new ApiError(msg.replace(/^invalid_filter:\s*/, ''));
    }
    return j;
  }

  // ------------------------------------------------------------------ URL-state (§12.3)
  function readUrl() {
    const p = new URLSearchParams(location.search);
    const f = {};
    for (const [short, key] of Object.entries(URL_KEYS)) {
      const v = p.get(short);
      if (v === null || v === '') continue;
      if (key === 'types' || key === 'sources') f[key] = v.split(',').filter(Boolean);
      else if (key.startsWith('min_') || key.startsWith('max_')) f[key] = Number(v);
      else f[key] = v;
    }
    if (!p.has('tx') && !p.has('types')) Object.assign(f, structuredClone(DEFAULTS));
    if (!f.transaction) f.transaction = 'sale';
    if (p.get('tab')) TAB = p.get('tab');
    if (p.get('cmp')) CMP = p.get('cmp').split(',').filter(Boolean).slice(0, 5);
    if (p.get('none') === 'types') delete f.types;
    return f;
  }
  function writeUrl() {
    const p = new URLSearchParams();
    for (const [short, key] of Object.entries(URL_KEYS)) {
      const v = F[key];
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) continue;
      p.set(short, Array.isArray(v) ? v.join(',') : v);
    }
    if (!F.types) p.set('none', 'types');
    if (TAB !== 'overview') p.set('tab', TAB);
    if (TAB === 'compare') p.set('cmp', CMP.join(','));
    history.replaceState(null, '', `${location.pathname}?${p.toString()}`);
  }

  // ------------------------------------------------------------------ filters (§12)
  function validateLocal() {
    const pairs = [['min_price', 'max_price', 'Minimumprijs is hoger dan maximumprijs.'], ['min_area', 'max_area', 'Minimale oppervlakte is groter dan maximale.'], ['min_bedrooms', 'max_bedrooms', 'Minimum slaapkamers is hoger dan maximum.']];
    for (const [a, b, m] of pairs) if (F[a] != null && F[b] != null && F[a] > F[b]) return m;
    return null;
  }

  function setFilter(patch, opts = {}) {
    for (const [k, v] of Object.entries(patch)) {
      if (v === undefined || v === null || v === '' || (Array.isArray(v) && !v.length)) delete F[k];
      else F[k] = v;
    }
    if ('city' in patch && !opts.keepNb) delete F.neighborhood;
    syncFilterUi();
    refresh();
  }

  function buildFilterUi() {
    const sel = $('#fCity');
    const cities = (META.cities || []).filter((c) => c.name);
    const focus = FOCUS.map((k) => cities.find((c) => c.key === k)).filter(Boolean);
    const rest = cities.filter((c) => !FOCUS.includes(c.key)).sort((a, b) => a.name.localeCompare(b.name, 'fr'));
    const opt = (c) => `<option value="${esc(c.key)}">${esc(c.name)} (${fmt(c.sale + c.rent)})</option>`;
    sel.innerHTML = `<option value="">Alle steden</option><optgroup label="Focussteden">${focus.map(opt).join('')}</optgroup><optgroup label="Alle steden A–Z">${rest.map(opt).join('')}</optgroup>`;
    sel.onchange = () => setFilter({ city: sel.value || null });
    $('#fNb').onchange = (e) => setFilter({ neighborhood: e.target.value || null }, { keepNb: true });
    $('#fTypes').innerHTML = TYPES.map(([k, l]) => `<button class="chip" data-v="${k}" aria-pressed="false">${l}</button>`).join('');
    $('#fTypes').onclick = (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      const cur = new Set(F.types || []);
      cur.has(b.dataset.v) ? cur.delete(b.dataset.v) : cur.add(b.dataset.v);
      setFilter({ types: [...cur] });
    };
    $('#fSources').innerHTML = SOURCES.map(([k, l]) => `<button class="chip" data-v="${k}" aria-pressed="false"><span class="dot" style="background:${SOURCE_COLOR[k]}"></span>${l}</button>`).join('');
    $('#fSources').onclick = (e) => {
      const b = e.target.closest('.chip'); if (!b) return;
      const cur = new Set(F.sources || []);
      cur.has(b.dataset.v) ? cur.delete(b.dataset.v) : cur.add(b.dataset.v);
      setFilter({ sources: [...cur] });
    };
    $('#fTx').onclick = (e) => { const b = e.target.closest('button'); if (b) setFilter({ transaction: b.dataset.v }); };
    let t;
    for (const [id, key] of Object.entries(NUM_INPUTS)) {
      $(`#${id}`).oninput = (e) => { clearTimeout(t); const v = e.target.value; t = setTimeout(() => setFilter({ [key]: v === '' ? null : Number(v) }), 450); };
    }
    $('#resetFilters').onclick = () => { F = structuredClone(DEFAULTS); syncFilterUi(); refresh(); };
  }

  function syncFilterUi() {
    $('#fTx').querySelectorAll('button').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.v === F.transaction)));
    $('#fCity').value = F.city || '';
    $('#fTypes').querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String((F.types || []).includes(b.dataset.v))));
    $('#fSources').querySelectorAll('.chip').forEach((b) => b.setAttribute('aria-pressed', String((F.sources || []).includes(b.dataset.v))));
    for (const [id, key] of Object.entries(NUM_INPUTS)) { const el = $(`#${id}`); if (document.activeElement !== el) el.value = F[key] ?? ''; }
    const t = F.types || [];
    $('#typeHint').textContent = !t.length ? 'Alle typen samen: prijs per m² vergelijkt ongelijke objecten.'
      : t.some((x) => ['villa', 'house', 'riad'].includes(x)) ? 'Villa, huis en riad: m² kan perceel of bebouwd zijn, dus geen prijs per m².'
      : t.length > 1 ? 'Meerdere typen: prijs per m² is een mengsel.' : '';
    renderNbSelect();
    renderActiveBar();
  }

  async function renderNbSelect() {
    const sel = $('#fNb');
    if (!F.city) { sel.disabled = true; sel.innerHTML = '<option value="">Kies eerst een stad</option>'; return; }
    sel.disabled = false;
    const key = JSON.stringify(without(F, 'neighborhood'));
    if (nbCache.city !== key) {
      nbCache = { city: key, items: [] };
      try {
        const r = await rpc('d2_locations', { f: without(F, 'neighborhood'), level: 'neighborhood', min_n: 1 });
        nbCache.items = r.data.items;
      } catch { nbCache.items = []; }
    }
    if (nbCache.city !== key) return;
    sel.innerHTML = `<option value="">Alle wijken (${fmt(nbCache.items.length)})</option>` +
      nbCache.items.map((i) => `<option value="${esc(i.key)}">${esc(i.name)} (${fmt(i.n_objects)})</option>`).join('');
    if (F.neighborhood && !nbCache.items.some((i) => i.key === F.neighborhood)) {
      sel.insertAdjacentHTML('beforeend', `<option value="${esc(F.neighborhood)}">${esc(F.neighborhood.split('|')[1])} (0)</option>`);
    }
    sel.value = F.neighborhood || '';
  }

  function renderActiveBar() {
    const chips = [];
    const add = (label, patch) => chips.push(`<span class="chip">${esc(label)}<button aria-label="Verwijder filter ${esc(label)}" data-patch='${esc(JSON.stringify(patch))}'>×</button></span>`);
    const cityName = (k) => (META?.cities || []).find((c) => c.key === k)?.name || k;
    add(F.transaction === 'rent' ? 'Huur' : 'Koop', null);
    if (F.city) add(`Stad: ${cityName(F.city)}`, { city: null });
    if (F.neighborhood) add(`Wijk: ${F.neighborhood.split('|')[1]}`, { neighborhood: null });
    (F.types || []).forEach((t) => add(TYPE_NL[t] || t, { types: (F.types || []).filter((x) => x !== t) }));
    (F.sources || []).forEach((s) => add(`Bron: ${SOURCE_NL[s]}`, { sources: (F.sources || []).filter((x) => x !== s) }));
    const r = (a, b, lbl, unit = '') => { if (F[a] != null || F[b] != null) add(`${lbl}: ${F[a] != null ? fmt(F[a]) : '…'}–${F[b] != null ? fmt(F[b]) : '…'}${unit}`, { [a]: null, [b]: null }); };
    r('min_price', 'max_price', 'Prijs', ' MAD'); r('min_area', 'max_area', 'm²'); r('min_bedrooms', 'max_bedrooms', 'Slaapkamers');
    if (F.min_bathrooms != null) add(`Badkamers ≥ ${F.min_bathrooms}`, { min_bathrooms: null });
    $('#activeBar').innerHTML = chips.join('').replace(/<button aria-label="Verwijder filter (Koop|Huur)" data-patch='null'>×<\/button>/, '') +
      '<button class="linkbtn" id="resetInline">Alles wissen</button>';
    $('#activeBar').querySelectorAll('button[data-patch]').forEach((b) => { b.onclick = () => setFilter(JSON.parse(b.dataset.patch)); });
    $('#resetInline').onclick = () => $('#resetFilters').click();
  }

  // ------------------------------------------------------------------ tabs
  function setTab(t) {
    TAB = t;
    document.querySelectorAll('#tabs button').forEach((b) => b.setAttribute('aria-selected', String(b.dataset.tab === t)));
    document.querySelectorAll('[data-panel]').forEach((s) => s.classList.toggle('hidden', s.dataset.panel !== t));
    refresh();
  }

  function refresh() {
    const err = validateLocal();
    $('#filterError').classList.toggle('hidden', !err);
    $('#filterError').textContent = err || '';
    writeUrl();
    if (err) return;
    const run = { overview: loadOverview, city: loadCity, compare: loadCompare, analyzer: renderAnalyzer, trends: loadTrends, yield: renderYield, method: renderMethod }[TAB];
    run && run(++seq);
  }

  // ------------------------------------------------------------------ charts
  function chart(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    if (charts[id] && charts[id].getDom() !== el) { charts[id].dispose(); delete charts[id]; }
    if (!charts[id]) charts[id] = echarts.init(el, null, { renderer: 'canvas' });
    return charts[id];
  }
  const baseAxis = { axisLine: { lineStyle: { color: C.border } }, axisTick: { show: false }, axisLabel: { color: C.muted, fontFamily: 'Jost', fontSize: 11 }, splitLine: { lineStyle: { color: C.grid } } };
  const tooltip = { backgroundColor: '#FEFCF8', borderColor: C.border, textStyle: { color: C.green, fontFamily: 'Jost', fontSize: 12 }, extraCssText: 'box-shadow:0 4px 14px rgba(28,46,29,.12);border-radius:8px;' };
  const toolbox = { right: 0, top: 0, feature: { saveAsImage: { title: 'PNG', name: 'marktdata', pixelRatio: 2 } }, iconStyle: { borderColor: C.faint } };

  // horizontale staaf met foutbalk (95%-interval)
  function barWithCi(id, items, opts = {}) {
    const ch = chart(id); if (!ch) return;
    const el = ch.getDom();
    el.style.height = `${Math.max(220, items.length * 24 + 60)}px`;
    ch.resize();
    const cats = items.map((i) => i.name);
    ch.setOption({
      animation: false,
      grid: { left: 8, right: 24, top: 28, bottom: 24, containLabel: true },
      tooltip: { ...tooltip, trigger: 'item', formatter: (p) => { const i = items[p.dataIndex]; if (!i) return ''; return `<b>${esc(i.name)}</b><br>Mediaan: ${fmt(i.median)} ${unitLabel()}<br>95%-interval: ${i.ci_low != null ? `${fmt(i.ci_low)} – ${fmt(i.ci_high)}` : '–'}<br>n = ${fmt(i.n)} · ${STATUS[i.status]?.[1] || ''}${i.index != null ? `<br>Index: ${fmt(i.index, 1)}` : ''}`; } },
      toolbox,
      xAxis: { type: 'value', ...baseAxis, axisLabel: { ...baseAxis.axisLabel, formatter: (v) => compact(v) } },
      yAxis: { type: 'category', data: cats, inverse: true, ...baseAxis, splitLine: { show: false },
        axisLabel: { ...baseAxis.axisLabel, fontSize: 12, formatter: (v, k) => `{a|${v.length > 24 ? `${v.slice(0, 23)}…` : v}}  {b|n=${fmt(items[k]?.n)}}`, rich: { a: { color: C.green, fontSize: 12, fontFamily: 'Jost' }, b: { color: C.faint, fontSize: 10, fontFamily: 'DM Mono' } } } },
      series: [
        { type: 'bar', barMaxWidth: 14, data: items.map((i) => ({ value: i.median, itemStyle: { color: i.selected ? C.accent : C.mid, opacity: i.status === 'indicative' ? 0.5 : 1, borderRadius: [0, 4, 4, 0] } })),
          markLine: opts.refLine ? { symbol: 'none', silent: true, lineStyle: { color: C.accent, type: 'dashed' }, label: { formatter: opts.refLabel, color: C.accent, fontSize: 11 }, data: [{ xAxis: opts.refLine }] } : undefined },
        { type: 'custom', silent: true, z: 5, data: items.map((i, k) => [k, i.ci_low, i.ci_high]),
          renderItem: (params, api) => {
            if (api.value(1) == null || Number.isNaN(api.value(1))) return null;
            const y = api.coord([0, api.value(0)])[1];
            const a = api.coord([api.value(1), api.value(0)])[0];
            const b = api.coord([api.value(2), api.value(0)])[0];
            const st = { stroke: C.green, lineWidth: 1.5 };
            return { type: 'group', children: [
              { type: 'line', shape: { x1: a, y1: y, x2: b, y2: y }, style: st },
              { type: 'line', shape: { x1: a, y1: y - 4, x2: a, y2: y + 4 }, style: st },
              { type: 'line', shape: { x1: b, y1: y - 4, x2: b, y2: y + 4 }, style: st },
            ] };
          } },
      ],
    }, true);
    ch.off('click');
    if (opts.onClick) ch.on('click', (p) => { if (p.seriesType === 'bar') opts.onClick(items[p.dataIndex]); });
  }

  function boxplot(id, items) {
    const ch = chart(id); if (!ch) return;
    ch.setOption({
      animation: false,
      grid: { left: 8, right: 16, top: 28, bottom: 60, containLabel: true },
      tooltip: { ...tooltip, trigger: 'item', formatter: (p) => { const i = items[p.dataIndex]; const u = i.unit; return `<b>${esc(i.name)}</b><br>n = ${fmt(u.n)}<br>P25: ${fmt(u.p25)} · mediaan: ${fmt(u.median)} · P75: ${fmt(u.p75)}<br>Snorharen: ${fmt(u.whisker_low)} – ${fmt(u.whisker_high)}<br>Mogelijke uitschieters (gemarkeerd, niet verwijderd): ${fmt(u.outlier_count)}`; } },
      toolbox,
      xAxis: { type: 'category', data: items.map((i) => i.name), ...baseAxis, axisLabel: { ...baseAxis.axisLabel, rotate: 35, interval: 0, color: C.green } },
      yAxis: { type: 'value', name: unitLabel(), nameTextStyle: { color: C.muted, fontSize: 11 }, ...baseAxis, axisLabel: { ...baseAxis.axisLabel, formatter: (v) => compact(v) } },
      series: [{ type: 'boxplot', boxWidth: [8, 26], itemStyle: { color: '#e3eedd', borderColor: C.mid, borderWidth: 1.5 },
        data: items.map((i) => [i.unit.whisker_low, i.unit.p25, i.unit.median, i.unit.p75, i.unit.whisker_high]) }],
    }, true);
  }

  // ------------------------------------------------------------------ module A
  function kpiCards(sum) {
    const d = sum.data; const k = Object.fromEntries(d.kpis.map((x) => [x.metric_id, x])); const u = d.unit_stats || {};
    const card = (x, extra = '', primary = false) => {
      const insufficient = x.status === 'insufficient' || x.status === 'empty';
      const val = insufficient ? '<span style="font-size:15px">Onvoldoende gegevens</span>'
        : x.metric_id === 'last_observation' ? esc(fmtDate(x.value))
        : `${fmt(x.value)}${x.unit && !['objecten', 'steden', 'datum'].includes(x.unit) ? `<small>${esc(x.unit)}</small>` : ''}`;
      return `<div class="kpi${primary ? ' primary' : ''}"><div class="lbl">${esc(x.label)}</div><div class="val">${val}</div><div class="sub">${extra}</div></div>`;
    };
    const ciLine = k.median_unit_price.confidence_interval?.[0] != null ? `95%-interval ${fmt(k.median_unit_price.confidence_interval[0])} – ${fmt(k.median_unit_price.confidence_interval[1])} · ` : '';
    return `<div class="kpis">
      ${card(k.unique_objects, `${fmt(d.counts.excluded_needs_review)} op controlelijst (niet meegeteld)`)}
      ${card(k.median_price, `n = ${fmt(k.median_price.sample_size)} ${badge(k.median_price.status)}`)}
      ${card(k.median_unit_price, `${ciLine}n = ${fmt(k.median_unit_price.sample_size)} ${badge(k.median_unit_price.status)}`, true)}
      ${card(k.mean_unit_price, d.area_weighted_unit_price != null ? `Oppervlaktegewogen: ${fmt(d.area_weighted_unit_price)}` : '')}
      ${card(k.cities, `${fmt(d.counts.neighborhoods)} wijken · ${fmt(d.counts.sources)} bronnen`)}
      ${card(k.last_observation, `Vanaf ${esc(fmtDate(d.observation_date_range[0]))}`)}
    </div>
    <details class="stats"><summary>Statistische details (${esc(unitLabel())})</summary>
      <div class="statgrid">
        ${[['Mediaan', u.median], ['Gemiddelde', u.mean], ['Getrimd gemiddelde (10%)', u.trimmed_mean_10], ['Oppervlaktegewogen', d.area_weighted_unit_price], ['P10', u.p10], ['P25', u.p25], ['P75', u.p75], ['P90', u.p90], ['IQR', u.iqr], ['Relatieve IQR', u.relative_iqr_pct, '%'], ['Standaarddeviatie', u.std_dev], ['Variatiecoëfficiënt', u.cv_pct, '%'], ['95%-interval mediaan', null, ciText(u)], ['Intervalbreedte', u.ci_width_pct, '%'], ['Precisie', null, u.precision || '–'], ['Mogelijke uitschieters', u.outlier_count]]
          .map(([l, v, s]) => `<div><span>${l}</span><span class="num">${v != null ? fmt(v, s === '%' ? 1 : 0) + (s === '%' ? '%' : '') : esc(s || '–')}</span></div>`).join('')}
      </div>
      <p class="muted" style="font-size:12px;margin:8px 0 0">${esc(u.ci_method ? `Interval: ${u.ci_method}.` : '')} Statistieken onder 10 objecten worden niet getoond; 10–29 is indicatief.</p>
    </details>`;
  }

  function qualityStrip(sum) {
    const q = sum.data.quality;
    return `<div class="panel"><div class="quality">
      ${badge(q.status)}
      <span>Met m²: <b>${pct(q.pct_with_surface)}</b></span>
      <span>Met wijk: <b>${pct(q.pct_with_neighborhood)}</b></span>
      <span>Statistische uitschieters: <b>${pct(q.pct_statistical_outlier)}</b></span>
      <span>Type/m²-waarschuwing: <b>${pct(q.pct_type_or_area_warning)}</b></span>
      <span>Bronnen: <b>${q.sources}</b></span>
      <span>Locatie: <b>${esc(q.geo_precision)}</b></span>
    </div>
    <ul class="limits">${sum.limitations.map((l) => `<li>${esc(l)}</li>`).join('')}</ul></div>`;
  }

  function overviewSkeleton() {
    const el = $('#tab-overview');
    if (el.dataset.ready) return;
    el.dataset.ready = '1';
    el.innerHTML = `
      <div id="ovKpis" class="loading" style="position:relative;min-height:120px"></div>
      <div id="ovQuality"></div>
      <div class="grid2">
        <div class="panel"><div class="ph"><h3>Kaart</h3>
          <div class="toggle" id="mapToggle"><button data-v="median" aria-pressed="true">Prijs/m²</button><button data-v="count" aria-pressed="false">Aantal</button><button data-v="index" aria-pressed="false">Index</button><button data-v="spread" aria-pressed="false">Spreiding</button></div></div>
          <p class="desc">Stadscentra, geen woninglocaties. Cirkelgrootte = aantal objecten. Klik om op een stad te filteren.</p>
          <div id="map" role="img" aria-label="Kaart van Marokko met steden"></div>
          <div class="legend" id="mapLegend"></div></div>
        <div class="panel"><div class="ph"><h3>Steden: mediane vraagprijs per m²</h3></div>
          <p class="desc">Steden met minstens 10 objecten, hoog naar laag. Lijn = 95%-interval. Lichte staaf = indicatief (10–29).</p>
          <div class="scrollbox"><div id="chCities" class="chart"></div></div></div>
      </div>
      <div class="panel"><div class="ph"><h3>Prijsverdeling</h3>
        <div class="toggle" id="distToggle"><button data-v="unit" aria-pressed="true">Per m²</button><button data-v="price" aria-pressed="false">Totaalprijs</button></div></div>
        <p class="desc" id="distDesc"></p><div id="chDist" class="chart"></div></div>
      <div class="grid2">
        <div class="panel"><div class="ph"><h3>Vastgoedtypen</h3></div><p class="desc">Objecten per type binnen de overige filters. Klik om op één type te filteren.</p><div id="chTypes" class="chart" style="height:300px"></div></div>
        <div class="panel"><div class="ph"><h3>Bronnen</h3></div><p class="desc">Advertenties per bron. Dezelfde woning kan op meerdere platforms staan, dus dit zijn geen unieke objecten.</p><div id="chSources" class="chart" style="height:180px"></div><div id="srcTable"></div></div>
      </div>`;
    $('#mapToggle').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; mapMetric = b.dataset.v; $('#mapToggle').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); drawMap(lastData.cities); };
    $('#distToggle').onclick = (e) => { const b = e.target.closest('button'); if (!b) return; distMetric = b.dataset.v; $('#distToggle').querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); loadDistribution(seq); };
  }

  async function loadOverview(my) {
    overviewSkeleton();
    document.querySelectorAll('#tab-overview .panel, #ovKpis').forEach((p) => p.classList.add('loading'));
    try {
      const [sum, cities, types, srcs] = await Promise.all([
        rpc('d2_summary', { f: F }),
        rpc('d2_locations', { f: without(F, 'city', 'neighborhood'), level: 'city', min_n: 1 }),
        rpc('d2_types', { f: without(F, 'types') }),
        rpc('d2_sources', { f: without(F, 'sources') }),
      ]);
      if (my !== seq) return;
      lastData = { ...lastData, summary: sum, cities, types, sources: srcs };
      $('#ovKpis').innerHTML = kpiCards(sum);
      $('#ovQuality').innerHTML = qualityStrip(sum);
      updateMetaLine(sum);
      drawMap(cities);
      drawCityRanking(cities);
      drawTypes(types);
      drawSources(srcs);
    } catch (e) {
      if (my !== seq) return;
      $('#ovKpis').innerHTML = `<div class="panel error">${esc(e.message)}</div>`;
    } finally {
      if (my === seq) document.querySelectorAll('#tab-overview .loading, #ovKpis').forEach((p) => p.classList.remove('loading'));
    }
    loadDistribution(my);
  }

  function updateMetaLine(sum) {
    const r = sum.data.observation_date_range;
    $('#metaLine').innerHTML = `Waarnemingen <b>${esc(fmtDate(r[0]))} – ${esc(fmtDate(r[1]))}</b> · dataset <span class="mono">${esc(sum.dataset_version || '–')}</span> · berekend ${esc(new Date(sum.calculated_at).toLocaleString('nl-NL'))}`;
  }

  function drawCityRanking(cities) {
    const items = cities.data.items
      .filter((i) => i.unit && ['publishable', 'indicative'].includes(i.unit.status))
      .sort((a, b) => b.n_objects - a.n_objects).slice(0, 40)
      .map((i) => ({ key: i.key, name: i.name, median: i.unit.median, ci_low: i.unit.ci95_low, ci_high: i.unit.ci95_high, n: i.unit.n, status: i.unit.status, index: i.relative_index, selected: i.key === F.city }))
      .sort((a, b) => b.median - a.median);
    if (!items.length) { $('#chCities').innerHTML = '<div class="empty">Geen steden met minstens 10 objecten voor deze selectie.</div>'; return; }
    barWithCi('chCities', items, { refLine: cities.data.reference_median_unit_price, refLabel: 'alle steden', onClick: (i) => setFilter({ city: F.city === i.key ? null : i.key }) });
  }

  function drawMap(cities) {
    if (!cities || !window.maplibregl) return;
    const pts = cities.data.items.filter((i) => i.latitude != null);
    const val = (i) => (mapMetric === 'count' ? i.n_objects : mapMetric === 'index' ? i.relative_index : mapMetric === 'spread' ? i.unit?.relative_iqr_pct : i.unit?.median);
    const vals = pts.map(val).filter((v) => v != null).sort((a, b) => a - b);
    const q = (p) => (vals.length ? vals[Math.min(vals.length - 1, Math.floor(p * (vals.length - 1)))] : 0);
    const stops = [q(0.05), q(0.3), q(0.55), q(0.8), q(0.97)];
    for (let k = 1; k < stops.length; k++) if (stops[k] <= stops[k - 1]) stops[k] = stops[k - 1] + 1e-6;
    const fc = { type: 'FeatureCollection', features: pts.map((i) => ({ type: 'Feature', geometry: { type: 'Point', coordinates: [i.longitude, i.latitude] },
      properties: { key: i.key, name: i.name, n: i.n_objects, v: val(i) ?? null, has: val(i) != null ? 1 : 0, sel: i.key === F.city ? 1 : 0,
        median: i.unit?.median ?? null, status: i.unit?.status ?? 'insufficient', index: i.relative_index ?? null, spread: i.unit?.relative_iqr_pct ?? null, nunit: i.unit?.n ?? 0 } })) };
    const lbl = { median: `Mediane prijs (${unitLabel()})`, count: 'Aantal objecten', index: 'Relatieve index (100 = alle steden)', spread: 'Relatieve IQR (%)' }[mapMetric];
    $('#mapLegend').innerHTML = vals.length ? `<span>${esc(lbl)}</span><span class="num">${fmt(stops[0], mapMetric === 'index' ? 1 : 0)}</span><span class="ramp"></span><span class="num">${fmt(stops[4], mapMetric === 'index' ? 1 : 0)}</span><span>· open cirkel = te weinig data</span>` : '';
    const color = ['case', ['==', ['get', 'has'], 1], ['interpolate', ['linear'], ['get', 'v'], stops[0], RAMP[0], stops[1], RAMP[1], stops[2], RAMP[2], stops[3], RAMP[3], stops[4], RAMP[4]], 'rgba(0,0,0,0)'];
    const radius = ['interpolate', ['linear'], ['sqrt', ['get', 'n']], 1, 3, 30, 9, 130, 24];
    if (!map) {
      map = new maplibregl.Map({
        container: 'map', center: [-7.0, 31.6], zoom: 4.5, scrollZoom: false, cooperativeGestures: false, minZoom: 3.5, maxZoom: 11, attributionControl: { compact: true },
        style: { version: 8, sources: { esri: { type: 'raster', tileSize: 256, attribution: 'Esri, HERE, Garmin, © OpenStreetMap-bijdragers', tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}'] } },
          layers: [{ id: 'esri', type: 'raster', source: 'esri' }] },
      });
      map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      map.on('load', () => {
        const big = pts.filter((i) => i.n_objects >= 30);
        if (big.length) map.fitBounds([[Math.min(...big.map((i) => i.longitude)), Math.min(...big.map((i) => i.latitude))], [Math.max(...big.map((i) => i.longitude)), Math.max(...big.map((i) => i.latitude))]], { padding: 30, duration: 0 });
        map.addSource('cities', { type: 'geojson', data: fc });
        map.addLayer({ id: 'c', type: 'circle', source: 'cities', paint: { 'circle-radius': radius, 'circle-color': color, 'circle-stroke-color': ['case', ['==', ['get', 'sel'], 1], C.accent, ['==', ['get', 'has'], 1], '#FEFCF8', C.faint], 'circle-stroke-width': ['case', ['==', ['get', 'sel'], 1], 3, 1.5], 'circle-opacity': 0.92 } });
        const pop = new maplibregl.Popup({ closeButton: false, closeOnClick: false, offset: 8 });
        map.on('mousemove', 'c', (e) => { map.getCanvas().style.cursor = 'pointer'; const p = e.features[0].properties;
          pop.setLngLat(e.lngLat).setHTML(`<b>${esc(p.name)}</b><br>${fmt(p.n)} objecten · ${fmt(p.nunit)} met m²<br>Mediane prijs: ${p.median !== 'null' && p.median != null ? `${fmt(p.median)} ${unitLabel()}` : 'onvoldoende data'}${p.index != null && p.index !== 'null' ? `<br>Index: ${fmt(p.index, 1)}` : ''}${p.spread != null && p.spread !== 'null' ? `<br>Rel. IQR: ${fmt(p.spread, 1)}%` : ''}`).addTo(map); });
        map.on('mouseleave', 'c', () => { map.getCanvas().style.cursor = ''; pop.remove(); });
        map.on('click', 'c', (e) => { const k = e.features[0].properties.key; setFilter({ city: F.city === k ? null : k }); });
      });
    } else if (map.getSource('cities')) {
      map.getSource('cities').setData(fc);
      map.setPaintProperty('c', 'circle-color', color);
      map.setPaintProperty('c', 'circle-stroke-color', ['case', ['==', ['get', 'sel'], 1], C.accent, ['==', ['get', 'has'], 1], '#FEFCF8', C.faint]);
      map.setPaintProperty('c', 'circle-stroke-width', ['case', ['==', ['get', 'sel'], 1], 3, 1.5]);
    } else {
      map.once('load', () => drawMap(cities));
    }
  }

  async function loadDistribution(my) {
    const panel = $('#chDist')?.closest('.panel'); if (!panel) return;
    panel.classList.add('loading');
    try {
      const r = await rpc('d2_distribution', { f: F, metric: distMetric });
      if (my !== seq) return;
      lastData.distribution = r;
      const d = r.data; const st = d.stats;
      const unit = distMetric === 'unit' ? unitLabel() : (F.transaction === 'rent' ? 'MAD/maand' : 'MAD');
      if (!d.bins.length) { $('#chDist').innerHTML = `<div class="empty">${esc(st.reason || 'Geen gegevens beschikbaar voor deze selectie.')}</div>`; chart('chDist')?.clear(); $('#distDesc').textContent = ''; return; }
      $('#distDesc').textContent = `${fmt(st.n)} objecten · mediaan ${fmt(st.median)}, stippellijnen P25 ${fmt(st.p25)} en P75 ${fmt(st.p75)} ${unit}. Bereik P1–P99 getoond; ${fmt(d.below_p1)} lager en ${fmt(d.above_p99)} hoger vallen erbuiten (${d.bin_rule}).`;
      const ch = chart('chDist');
      ch.setOption({
        animation: false,
        grid: { left: 8, right: 16, top: 30, bottom: 28, containLabel: true },
        toolbox,
        tooltip: { ...tooltip, trigger: 'item', formatter: (p) => { const b = d.bins[p.dataIndex]; return b ? `${fmt(b.lo)} – ${fmt(b.hi)} ${unit}<br><b>${fmt(b.count)}</b> objecten` : ''; } },
        xAxis: { type: 'value', min: d.bins[0].lo, max: d.bins[d.bins.length - 1].hi, ...baseAxis, axisLabel: { ...baseAxis.axisLabel, formatter: (v) => compact(v) }, name: unit, nameLocation: 'end', nameTextStyle: { color: C.muted, fontSize: 11 } },
        yAxis: { type: 'value', ...baseAxis, axisLabel: { ...baseAxis.axisLabel, formatter: (v) => compact(v) }, name: 'objecten', nameTextStyle: { color: C.muted, fontSize: 11 } },
        series: [{ type: 'custom', encode: { x: [0, 1], y: 2 }, data: d.bins.map((b) => [b.lo, b.hi, b.count]),
          renderItem: (params, api) => { const a = api.coord([api.value(0), api.value(2)]); const b = api.coord([api.value(1), 0]);
            return { type: 'rect', shape: { x: a[0] + 1, y: a[1], width: Math.max(1, b[0] - a[0] - 2), height: b[1] - a[1], r: [3, 3, 0, 0] }, style: { fill: C.mid } }; } },
          { type: 'line', data: [], z: 10, silent: true, markLine: { symbol: 'none', silent: true,
            data: [{ name: 'P25', xAxis: st.p25, label: { show: false }, lineStyle: { color: C.faint, type: 'dashed' } },
                   { name: 'Mediaan', xAxis: st.median, label: { formatter: () => `mediaan ${fmt(st.median)}`, color: C.accent, fontSize: 11 }, lineStyle: { color: C.accent, width: 2 } },
                   { name: 'P75', xAxis: st.p75, label: { show: false }, lineStyle: { color: C.faint, type: 'dashed' } }] } }],
      }, true);
    } catch (e) {
      if (my === seq) $('#chDist').innerHTML = `<div class="error">${esc(e.message)}</div>`;
    } finally { if (my === seq) panel.classList.remove('loading'); }
  }

  function drawTypes(types) {
    const items = types.data.items;
    const ch = chart('chTypes'); if (!ch) return;
    const sel = new Set(F.types || []);
    ch.setOption({
      animation: false,
      grid: { left: 8, right: 60, top: 10, bottom: 10, containLabel: true },
      tooltip: { ...tooltip, trigger: 'item', formatter: (p) => { const i = items[p.dataIndex]; return `<b>${esc(TYPE_NL[i.type] || i.type)}</b><br>${fmt(i.n_objects)} objecten<br>Met bruikbare m²: ${fmt(i.n_unit)}${i.median_unit_price != null ? `<br>Mediaan: ${fmt(i.median_unit_price)} ${unitLabel()}` : ''}`; } },
      xAxis: { type: 'value', ...baseAxis, axisLabel: { ...baseAxis.axisLabel, formatter: (v) => compact(v) } },
      yAxis: { type: 'category', inverse: true, data: items.map((i) => TYPE_NL[i.type] || i.type), ...baseAxis, splitLine: { show: false }, axisLabel: { ...baseAxis.axisLabel, color: C.green, fontSize: 12 } },
      series: [{ type: 'bar', barMaxWidth: 16, data: items.map((i) => ({ value: i.n_objects, itemStyle: { color: sel.has(i.type) ? C.accent : C.mid, borderRadius: [0, 4, 4, 0] } })),
        label: { show: true, position: 'right', formatter: (p) => compact(p.value), color: C.muted, fontSize: 11, fontFamily: 'DM Mono' } }],
    }, true);
    ch.off('click'); ch.on('click', (p) => { const t = items[p.dataIndex].type; setFilter({ types: sel.size === 1 && sel.has(t) ? null : [t] }); });
  }

  function drawSources(srcs) {
    const items = srcs.data.items;
    const ch = chart('chSources'); if (!ch) return;
    const sel = new Set(F.sources || []);
    ch.setOption({
      animation: false,
      grid: { left: 8, right: 70, top: 6, bottom: 6, containLabel: true },
      tooltip: { ...tooltip, trigger: 'item', formatter: (p) => { const i = items[p.dataIndex]; return `<b>${SOURCE_NL[i.source]}</b><br>${fmt(i.listings)} advertenties (${pct(i.share_pct)})`; } },
      xAxis: { type: 'value', show: false },
      yAxis: { type: 'category', inverse: true, data: items.map((i) => SOURCE_NL[i.source]), ...baseAxis, splitLine: { show: false }, axisLabel: { ...baseAxis.axisLabel, color: C.green, fontSize: 12 } },
      series: [{ type: 'bar', barMaxWidth: 18, data: items.map((i) => ({ value: i.listings, itemStyle: { color: SOURCE_COLOR[i.source], opacity: !sel.size || sel.has(i.source) ? 1 : 0.35, borderRadius: [0, 4, 4, 0] } })),
        label: { show: true, position: 'right', formatter: (p) => `${compact(p.value)} · ${pct(items[p.dataIndex].share_pct)}`, color: C.muted, fontSize: 11, fontFamily: 'DM Mono' } }],
    }, true);
    ch.off('click'); ch.on('click', (p) => { const s = items[p.dataIndex].source; setFilter({ sources: sel.size === 1 && sel.has(s) ? null : [s] }); });
    $('#srcTable').innerHTML = `<div class="tw" style="margin-top:8px"><table><thead><tr><th>Bron</th><th class="n">Advertenties</th><th class="n">Aandeel</th><th class="n">Met m²</th><th class="n">Mediaan ${esc(unitLabel())}</th><th>Waargenomen</th></tr></thead><tbody>${
      items.map((i) => `<tr><td><span class="chip" style="border:0;padding:0;background:none"><span class="dot" style="background:${SOURCE_COLOR[i.source]}"></span>${SOURCE_NL[i.source]}</span></td><td class="n">${fmt(i.listings)}</td><td class="n">${pct(i.share_pct)}</td><td class="n">${fmt(i.n_unit)}</td><td class="n">${fmt(i.median_unit_price)}</td><td>${esc(fmtDate(i.observed_start))}${i.observed_end && i.observed_end.slice(0, 10) !== (i.observed_start || '').slice(0, 10) ? ` – ${esc(fmtDate(i.observed_end))}` : ''}</td></tr>`).join('')
    }</tbody></table></div>`;
  }

  // ------------------------------------------------------------------ module B
  let nbSort = { key: 'n_objects', dir: -1 };
  async function loadCity(my) {
    const el = $('#tab-city');
    if (!F.city) {
      const top = (META.cities || []).slice(0, 24);
      el.innerHTML = `<div class="panel"><h3>Kies een stad</h3><p class="desc">Dit onderdeel toont de wijken binnen één stad. Kies hieronder of via het filterpaneel.</p>
        <div class="city-pick">${top.map((c) => `<button class="chip" data-city="${esc(c.key)}">${esc(c.name)} <span class="muted num">${fmt(c.sale + c.rent)}</span></button>`).join('')}</div></div>`;
      el.querySelectorAll('[data-city]').forEach((b) => { b.onclick = () => setFilter({ city: b.dataset.city }); });
      return;
    }
    if (!el.querySelector('#cityHead')) {
      el.innerHTML = `<div id="cityHead"></div>
        <div class="panel"><div class="ph"><h3>Wijken: mediane vraagprijs per m²</h3></div><p class="desc">Wijken met minstens 10 objecten. Stippellijn = stadsmediaan (index 100). Klik op een wijk om te filteren.</p><div class="scrollbox"><div id="chNb" class="chart"></div></div></div>
        <div class="panel"><div class="ph"><h3>Spreiding per wijk</h3></div><p class="desc">Boxplots van de 15 grootste wijken: doos = P25–P75, streep = mediaan, snorharen tot 1,5 × IQR.</p><div id="chBox" class="chart" style="height:380px"></div></div>
        <div class="panel"><div class="ph"><h3>Alle wijken</h3><span class="muted" style="font-size:12px">Klik op een kolomkop om te sorteren</span></div><div id="nbTable"></div>
        <p class="callout">Wijknamen zijn nog niet opgeschoond buiten accenten en hoofdletters. Varianten zoals ‘Hay Riad’ en ‘Riyad’ kunnen dezelfde wijk zijn. ‘Autre secteur’ en ‘wijk = stad’ tellen als onbekend.</p></div>`;
    }
    el.querySelectorAll('.panel, #cityHead').forEach((p) => p.classList.add('loading'));
    try {
      const fc = without(F, 'neighborhood');
      const [sum, nbs] = await Promise.all([rpc('d2_summary', { f: fc }), rpc('d2_locations', { f: fc, level: 'neighborhood', min_n: 1 })]);
      if (my !== seq) return;
      lastData.city = { summary: sum, neighborhoods: nbs };
      updateMetaLine(sum);
      const u = sum.data.unit_stats; const cityName = (META.cities.find((c) => c.key === F.city) || {}).name || F.city;
      $('#cityHead').innerHTML = `<div class="panel" style="margin-top:0"><div class="ph"><h3>${esc(cityName)}</h3>${badge(sum.data.quality.status)}</div>
        <div class="quality"><span>Objecten: <b>${fmt(sum.data.counts.objects)}</b></span><span>Mediane prijs/m²: <b class="num">${fmt(u.median)} ${esc(unitLabel())}</b></span><span>95%-interval: <b class="num">${ciText(u)}</b></span><span>P25–P75: <b class="num">${fmt(u.p25)} – ${fmt(u.p75)}</b></span><span>Wijken: <b>${fmt(nbs.data.items.length)}</b></span><span>Met wijk: <b>${pct(sum.data.quality.pct_with_neighborhood)}</b></span></div></div>`;
      const ok = nbs.data.items.filter((i) => i.unit && ['publishable', 'indicative'].includes(i.unit.status));
      const bars = ok.map((i) => ({ key: i.key, name: i.name, median: i.unit.median, ci_low: i.unit.ci95_low, ci_high: i.unit.ci95_high, n: i.unit.n, status: i.unit.status, index: i.relative_index, selected: i.key === F.neighborhood })).sort((a, b) => b.median - a.median);
      if (bars.length) barWithCi('chNb', bars, { refLine: nbs.data.reference_median_unit_price, refLabel: 'stad', onClick: (i) => setFilter({ neighborhood: F.neighborhood === i.key ? null : i.key }, { keepNb: true }) });
      else { chart('chNb')?.clear(); $('#chNb').innerHTML = '<div class="empty">Geen wijken met minstens 10 objecten.</div>'; }
      const boxes = ok.filter((i) => i.unit.whisker_low != null).sort((a, b) => b.unit.n - a.unit.n).slice(0, 15).sort((a, b) => a.unit.median - b.unit.median);
      if (boxes.length) boxplot('chBox', boxes); else chart('chBox')?.clear();
      renderNbTable();
    } catch (e) {
      if (my === seq) $('#cityHead').innerHTML = `<div class="panel error">${esc(e.message)}</div>`;
    } finally { if (my === seq) el.querySelectorAll('.loading').forEach((p) => p.classList.remove('loading')); }
  }

  function renderNbTable() {
    const items = [...(lastData.city?.neighborhoods.data.items || [])];
    const get = (i, k) => (k === 'name' ? i.name : k === 'n_objects' ? i.n_objects : k === 'relative_index' ? i.relative_index : i.unit?.[k]);
    items.sort((a, b) => { const x = get(a, nbSort.key); const y = get(b, nbSort.key); if (x == null) return 1; if (y == null) return -1; return (x > y ? 1 : x < y ? -1 : 0) * nbSort.dir; });
    const cols = [['name', 'Wijk', false], ['n_objects', 'Objecten', true], ['n', 'Met m²', true], ['median', 'Mediaan', true], ['mean', 'Gemiddelde', true], ['p25', 'P25', true], ['p75', 'P75', true], ['relative_iqr_pct', 'Rel. IQR', true], ['relative_index', 'Index', true], ['ci', '95%-interval', true], ['status', 'Status', false]];
    $('#nbTable').innerHTML = `<div class="tw scrollbox"><table><thead><tr>${cols.map(([k, l, n]) => `<th class="sortable${n ? ' n' : ''}" data-k="${k}">${l}${nbSort.key === k ? (nbSort.dir > 0 ? ' ↑' : ' ↓') : ''}</th>`).join('')}</tr></thead><tbody>${
      items.map((i) => { const u = i.unit || {}; return `<tr class="clickable${i.key === F.neighborhood ? ' selected' : ''}" data-k="${esc(i.key)}"><td>${esc(i.name)}</td><td class="n">${fmt(i.n_objects)}</td><td class="n">${fmt(u.n)}</td><td class="n">${fmt(u.median)}</td><td class="n">${fmt(u.mean)}</td><td class="n">${fmt(u.p25)}</td><td class="n">${fmt(u.p75)}</td><td class="n">${u.relative_iqr_pct != null ? pct(u.relative_iqr_pct) : '–'}</td><td class="n">${fmt(i.relative_index, 1)}</td><td class="n">${ciText(u)}</td><td>${badge(u.status)}</td></tr>`; }).join('')
    }</tbody></table></div>`;
    $('#nbTable').querySelectorAll('th[data-k]').forEach((th) => { th.onclick = () => { const k = th.dataset.k; if (k === 'ci') return; nbSort = { key: k, dir: nbSort.key === k ? -nbSort.dir : (k === 'name' ? 1 : -1) }; renderNbTable(); }; });
    $('#nbTable').querySelectorAll('tr[data-k]').forEach((tr) => { tr.onclick = () => setFilter({ neighborhood: F.neighborhood === tr.dataset.k ? null : tr.dataset.k }, { keepNb: true }); });
  }

  // ------------------------------------------------------------------ module C
  const cmpNb = {};
  async function nbOptions(city) {
    if (cmpNb[city]) return cmpNb[city];
    const r = await rpc('d2_locations', { f: { ...without(F, 'city', 'neighborhood'), city }, level: 'neighborhood', min_n: 10 });
    cmpNb[city] = r.data.items; return cmpNb[city];
  }
  async function loadCompare(my) {
    const el = $('#tab-compare');
    const cities = META.cities || [];
    const cityOpts = (sel) => `<option value="">Kies stad…</option>${cities.slice(0, 120).map((c) => `<option value="${esc(c.key)}"${c.key === sel ? ' selected' : ''}>${esc(c.name)}</option>`).join('')}`;
    const rows = await Promise.all(CMP.map(async (a, idx) => {
      const isNb = a.startsWith('nb:'); const key = a.slice(isNb ? 3 : 5); const city = isNb ? key.split('|')[0] : key;
      let nbs = []; try { nbs = await nbOptions(city); } catch { /* geen wijken */ }
      return `<div class="cmp-row" data-i="${idx}"><span class="idx">${idx + 1}</span><select class="cmpCity" aria-label="Stad ${idx + 1}">${cityOpts(city)}</select>
        <select class="cmpNb" aria-label="Wijk ${idx + 1}"><option value="">Hele stad</option>${nbs.map((n) => `<option value="${esc(n.key)}"${isNb && n.key === key ? ' selected' : ''}>${esc(n.name)} (${fmt(n.n_objects)})</option>`).join('')}</select>
        <button class="btn" data-del="${idx}" aria-label="Verwijder gebied ${idx + 1}">×</button></div>`;
    }));
    if (my !== seq) return;
    el.innerHTML = `<div class="panel" style="margin-top:0"><div class="ph"><h3>Gebieden vergelijken</h3><span class="muted" style="font-size:12px">Dezelfde filters (type, m², prijs, bron) voor alle gebieden</span></div>
      ${rows.join('')}
      ${CMP.length < 5 ? '<button class="btn" id="cmpAdd" style="margin-top:6px">+ Gebied toevoegen</button>' : ''}
      <p class="desc" style="margin-top:10px">Gebied 1 is de referentie voor het verschil. Stad en wijk in het filterpaneel worden hier genegeerd.</p></div>
      <div class="panel" id="cmpOut"><div class="empty">Berekenen…</div></div>
      <div class="grid2"><div class="panel"><h3>Mediane prijs per m² met 95%-interval</h3><div id="chCmp" class="chart" style="height:300px"></div></div>
      <div class="panel"><h3>Spreiding</h3><div id="chCmpBox" class="chart" style="height:300px"></div></div></div>`;
    el.querySelectorAll('.cmpCity').forEach((s) => { s.onchange = () => { const i = +s.closest('.cmp-row').dataset.i; CMP[i] = s.value ? `city:${s.value}` : CMP[i]; refresh(); }; });
    el.querySelectorAll('.cmpNb').forEach((s) => { s.onchange = () => { const row = s.closest('.cmp-row'); const i = +row.dataset.i; const city = row.querySelector('.cmpCity').value; CMP[i] = s.value ? `nb:${s.value}` : `city:${city}`; refresh(); }; });
    el.querySelectorAll('[data-del]').forEach((b) => { b.onclick = () => { if (CMP.length > 1) { CMP.splice(+b.dataset.del, 1); refresh(); } }; });
    $('#cmpAdd') && ($('#cmpAdd').onclick = () => { CMP.push('city:agadir'); refresh(); });
    try {
      const r = await rpc('d2_compare', { f: without(F, 'city', 'neighborhood'), areas: CMP });
      if (my !== seq) return;
      lastData.compare = r;
      if (!$('#metaLine').querySelector('b')) rpc('d2_summary', { f: without(F, 'city', 'neighborhood') }).then(updateMetaLine).catch(() => {});
      const items = r.data.items;
      $('#cmpOut').innerHTML = `<div class="ph"><h3>Vergelijkingsmatrix</h3></div><div class="tw"><table><thead><tr><th>Gebied</th><th class="n">Mediaan ${esc(unitLabel())}</th><th class="n">Gemiddelde</th><th class="n">P25</th><th class="n">P75</th><th class="n">Rel. IQR</th><th class="n">n</th><th class="n">Verschil t.o.v. 1</th><th class="n">95%-interval</th><th>Status</th></tr></thead><tbody>${
        items.map((i, k) => { const u = i.unit; return `<tr><td>${k + 1}. ${esc(i.name)}</td><td class="n">${fmt(u.median)}</td><td class="n">${fmt(u.mean)}</td><td class="n">${fmt(u.p25)}</td><td class="n">${fmt(u.p75)}</td><td class="n">${u.relative_iqr_pct != null ? pct(u.relative_iqr_pct) : '–'}</td><td class="n">${fmt(u.n)}</td><td class="n">${k === 0 ? 'referentie' : i.difference_vs_first_pct != null ? `${i.difference_vs_first_pct > 0 ? '+' : ''}${fmt(i.difference_vs_first_pct, 1)}%` : '–'}</td><td class="n">${ciText(u)}</td><td>${badge(u.status)}${u.reason ? ` <span class="muted">${esc(u.reason)}</span>` : ''}</td></tr>`; }).join('')
      }</tbody></table></div><p class="callout">${esc(r.data.note)}</p>`;
      const ok = items.filter((i) => i.unit.median != null);
      barWithCi('chCmp', ok.map((i) => ({ name: i.name, median: i.unit.median, ci_low: i.unit.ci95_low, ci_high: i.unit.ci95_high, n: i.unit.n, status: i.unit.status })), {});
      const boxes = ok.filter((i) => i.unit.whisker_low != null);
      if (boxes.length) boxplot('chCmpBox', boxes);
    } catch (e) { if (my === seq) $('#cmpOut').innerHTML = `<div class="error">${esc(e.message)}</div>`; }
  }

  // ------------------------------------------------------------------ D, E, F
  function notActive(id, title, why, needs) {
    $(id).innerHTML = `<div class="panel" style="margin-top:0"><div class="ph"><h3>${esc(title)}</h3><span class="badge warn">nog niet actief</span></div>
      <p>${esc(why)}</p><h4 style="font-family:var(--serif);font-weight:500;font-size:18px;margin:14px 0 4px">Wat nodig is</h4><ul>${needs.map((n) => `<li>${esc(n)}</li>`).join('')}</ul>
      <p class="callout">Volgens de specificatie wordt dit onderdeel technisch voorbereid maar niet met fictieve resultaten gevuld.</p></div>`;
  }
  function renderAnalyzer() {
    notActive('#tab-analyzer', 'Prijsanalyse van een object (fase 2)', 'De vergelijkbare-objectenmotor (§13) is gepland voor fase 2. Met de huidige data kan een vergelijking op stad, wijk, type, m² en slaapkamers, maar staat van het object, nieuwbouwstatus en afstand ontbreken.', [
      'Gevalideerde ontdubbeling tussen platforms (labelset van 300 paren).', 'Opgeschoonde wijknamen en buurwijken per stad.', 'Bij voorkeur: staat, nieuwbouw/bestaand en coördinaten per advertentie.']);
  }
  async function loadTrends(my) {
    let reason = 'Elke bron heeft één waarnemingsmoment.';
    try { const r = await rpc('d2_timeseries', { f: F }); if (my !== seq) return; reason = r.data.reason || reason; } catch { /* standaardtekst */ }
    notActive('#tab-trends', 'Prijsontwikkeling', `${reason} De drie bestanden (11, 14 en 16–18 november 2026) zijn losse momentopnames van verschillende bronnen en vormen geen trend.`, [
      'Herhaalde waarnemingen van dezelfde bron (bijv. wekelijks).', 'Koppeling met de prijshistorie van de wekelijkse scraper (sinds juli 2026) op advertentie-ID.', 'Vaste segmenten en basisperiode voor de vraagprijsindex (§11 E).']);
  }
  function renderYield() {
    notActive('#tab-yield', 'Huurrendement', 'Alleen Agenz vermeldt expliciet een maandhuur (ongeveer 1.000 appartementen). Mubawab en Avito vermelden geen huurperiode, en 400 DH kan een nachtprijs zijn. Een rendement uit losse huur- en koopvraagprijzen zou daardoor te zwak onderbouwd zijn.', [
      'Huurperiode per advertentie (maand/nacht).', 'Voldoende vergelijkbare huur- en koopobjecten per segment.', 'Expliciete aannames voor leegstand en kosten voor een netto rendement.']);
  }

  // ------------------------------------------------------------------ module G
  function renderMethod() {
    const el = $('#tab-method');
    const ds = META.dataset || {}; const a = ds.audit_summary || {}; const s = META.settings || {};
    const rec = a.reconciliation || []; const recOk = rec.filter((r) => r.match).length;
    const tbl = (rows, cols) => `<div class="tw"><table><thead><tr>${cols.map(([, l, n]) => `<th${n ? ' class="n"' : ''}>${esc(l)}</th>`).join('')}</tr></thead><tbody>${rows.map((r) => `<tr>${cols.map(([k, , n, f]) => `<td${n ? ' class="n"' : ''}>${f ? f(r[k], r) : n ? fmt(r[k]) : esc(r[k])}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
    const feas = a.feasibility || {};
    const stMap = { beschikbaar: 'publishable', beperkt: 'indicative', 'niet beschikbaar': 'insufficient' };
    el.innerHTML = `<div class="panel method" style="margin-top:0">
      <div class="ph"><h3>Data &amp; methode</h3><span class="muted mono" style="font-size:12px">dataset ${esc(ds.id || '–')} · metrics ${esc(ds.metric_version || '–')} · regels ${esc(ds.rules_version || '–')}</span></div>
      <h4>Bronnen</h4>${tbl(META.batches || [], [['source', 'Bron', false, (v) => esc(SOURCE_NL[v] || v)], ['filename', 'Bestand'], ['observed_start', 'Waargenomen', false, (v, r) => `${esc(fmtDate(v))}${r.observed_end && r.observed_end.slice(0, 10) !== (v || '').slice(0, 10) ? ` – ${esc(fmtDate(r.observed_end))}` : ''}`], ['records', 'Records', true], ['valid', 'Bruikbaar', true], ['review', 'Controlelijst', true], ['hash', 'SHA-256', false, (v) => `<span class="mono">${esc(v)}…</span>`]])}
      <p class="muted" style="font-size:13px">${recOk} van ${rec.length} tellingen uit de toelichtingen van de bronnen komen exact overeen met de import. Statussen: ${Object.entries(META.status_counts || {}).map(([k, v]) => `${esc(k)} ${fmt(v)}`).join(' · ')}.</p>
      <h4>KPI-definities</h4><ul>
        <li><b>Geobserveerde vastgoedobjecten</b>: <span class="formula">COUNT(DISTINCT property_id)</span>. Nu nog gelijk aan advertenties: ontdubbeling tussen platforms is niet gevalideerd.</li>
        <li><b>Mediane vraagprijs per m²</b> (primaire KPI): mediaan van <span class="formula">prijs_MAD / m²</span>, alleen koop (of huur met maandprijs), m² &gt; 0 en vergelijkbare oppervlaktebasis.</li>
        <li><b>Gemiddelde prijs per m²</b>: <span class="formula">Σ(prijs/m²) / n</span>. <b>Oppervlaktegewogen</b>: <span class="formula">Σ prijs / Σ m²</span>. Deze twee zijn niet hetzelfde.</li>
        <li><b>Percentielen</b>: lineaire interpolatie (<span class="formula">PERCENTILE_CONT</span>, h = 1 + (n−1)·q). <b>IQR</b> = P75 − P25; <b>relatieve IQR</b> = IQR / mediaan × 100.</li>
        <li><b>Getrimd gemiddelde</b>: 10% laagste en hoogste weg (<span class="formula">k = FLOOR(0,1·n)</span>). <b>SD</b> met n−1; <b>CV</b> = SD / gemiddelde × 100.</li>
        <li><b>Relatieve index</b>: <span class="formula">100 × mediaan gebied / mediaan referentie</span> (stad voor wijken, alle steden in de selectie voor steden). Geen kwaliteitsgecorrigeerde index.</li>
        <li><b>Verschil tussen gebieden</b>: <span class="formula">(mediaan A / mediaan B − 1) × 100</span>. Dat bewijst niet dat een identieke woning zoveel meer waard is.</li></ul>
      <h4>Betrouwbaarheid en publicatiebeleid</h4><ul>
        <li>Minder dan <b>${fmt(s.suppress_below)}</b> objecten: geen prijsstatistiek. ${fmt(s.suppress_below)}–${fmt(s.interval_from - 1)}: indicatief. Vanaf ${fmt(s.interval_from)}: met 95%-interval.</li>
        <li>Interval van de mediaan: verdelingsvrij op rangordes (Conover), direct berekend voor iedere filtercombinatie. De specificatie noemt bootstrap; bij de controle lagen beide dicht bij elkaar (Casablanca-appartementen 80–120 m²: rangorde 12.500–12.791, bootstrap 12.500–12.778). Bij kleine groepen is het rangorde-interval iets breder, dus voorzichtiger.</li>
        <li>Intervalbreedte tot ${fmt(s.ci_precise_max)}%: relatief nauwkeurig; tot ${fmt(s.ci_noticeable_max)}%: merkbare onzekerheid; daarboven: grote onzekerheid.</li>
        <li>Dit interval beschrijft steekproefonzekerheid, niet hoe goed de platforms de hele markt dekken.</li></ul>
      <h4>Datakwaliteit</h4>
      <p>Uitschieters (1,5 × IQR per stad, type en transactie) worden gemarkeerd, niet verwijderd. Onduidelijke prijsnotaties (bijv. ‘120’ voor 120 miljoen centimes, of een m²-prijs als totaalprijs) worden niet omgerekend maar staan op de controlelijst en tellen niet mee tot ze zijn goedgekeurd.</p>
      ${tbl((a.validation_flags || []).filter((f) => f.severity !== 'info'), [['flag', 'Vlag', false, (v) => `<span class="mono">${esc(v)}</span>`], ['severity', 'Niveau'], ['total', 'Aantal', true]])}
      <h4>Wat kan nu wel en niet</h4>${tbl(feas.modules || [], [['id', ''], ['name', 'Onderdeel'], ['status', 'Status', false, (v) => badge(stMap[v]).replace(/>[^<]+</, `>${esc(v)}<`)], ['note', 'Toelichting']])}
      <h4>Beperkingen</h4><ul>${(a.limitations || []).map((l) => `<li>${esc(l)}</li>`).join('')}</ul>
    </div>`;
  }

  // ------------------------------------------------------------------ export (§24)
  function exportCsv() {
    const sep = ';';
    const num = (v) => (v === null || v === undefined ? '' : String(v).replace('.', ','));
    const cell = (v) => { const s = String(v ?? ''); return /[;"\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
    const rows = [];
    const head = (sum) => [
      ['# Maghreb Estates — Marktdata 2.0 export'],
      ['# Filters', JSON.stringify(F)],
      ['# Definitie', `Mediane vraagprijs per m² (${unitLabel()}): mediaan van prijs/m² (PERCENTILE_CONT 0,5). 95%-interval: rangorde (verdelingsvrij).`],
      ['# Berekend', sum?.calculated_at || new Date().toISOString()],
      ['# Datasetversie', sum?.dataset_version || META?.dataset?.id || ''],
      ['# Waarschuwing', 'Vraagprijzen uit advertenties (Agenz, Mubawab, Avito), geen transactieprijzen. n telt advertenties; geen ontdubbeling tussen platforms.'],
      [],
    ];
    let name = 'marktdata';
    if (TAB === 'overview' && lastData.cities) {
      rows.push(...head(lastData.summary));
      rows.push(['Stad', 'Objecten', `n met ${unitLabel()}`, 'Mediaan', 'Gemiddelde', 'P25', 'P75', 'CI95 laag', 'CI95 hoog', 'Relatieve index', 'Status']);
      lastData.cities.data.items.forEach((i) => { const u = i.unit || {}; rows.push([i.name, i.n_objects, u.n, num(u.median), num(u.mean), num(u.p25), num(u.p75), num(u.ci95_low), num(u.ci95_high), num(i.relative_index), u.status]); });
      name = 'marktdata-steden';
    } else if (TAB === 'city' && lastData.city) {
      rows.push(...head(lastData.city.summary));
      rows.push(['Wijk', 'Objecten', `n met ${unitLabel()}`, 'Mediaan', 'Gemiddelde', 'P25', 'P75', 'CI95 laag', 'CI95 hoog', 'Index t.o.v. stad', 'Status']);
      lastData.city.neighborhoods.data.items.forEach((i) => { const u = i.unit || {}; rows.push([i.name, i.n_objects, u.n, num(u.median), num(u.mean), num(u.p25), num(u.p75), num(u.ci95_low), num(u.ci95_high), num(i.relative_index), u.status]); });
      name = `marktdata-wijken-${F.city}`;
    } else if (TAB === 'compare' && lastData.compare) {
      rows.push(...head(lastData.compare));
      rows.push(['Gebied', 'n', 'Mediaan', 'Gemiddelde', 'P25', 'P75', 'Relatieve IQR %', 'Verschil t.o.v. gebied 1 %', 'CI95 laag', 'CI95 hoog', 'Status']);
      lastData.compare.data.items.forEach((i) => { const u = i.unit || {}; rows.push([i.name, u.n, num(u.median), num(u.mean), num(u.p25), num(u.p75), num(u.relative_iqr_pct), num(i.difference_vs_first_pct), num(u.ci95_low), num(u.ci95_high), u.status]); });
      name = 'marktdata-vergelijking';
    } else { alert('Export is beschikbaar op Marktoverzicht, Stad & wijk en Vergelijken.'); return; }
    const blob = new Blob(['﻿' + rows.map((r) => r.map(cell).join(sep)).join('\r\n')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`; a.click(); URL.revokeObjectURL(a.href);
  }

  // ------------------------------------------------------------------ start
  async function start() {
    $('#envBadge').textContent = CFG.environment || '';
    if (!API) { $('#main').innerHTML = '<div class="panel error">Geen Supabase-configuratie (config.js).</div>'; return; }
    F = readUrl();
    try { META = await rpc('d2_meta', {}); }
    catch (e) { $('#main').innerHTML = `<div class="panel error">Kan de database niet bereiken: ${esc(e.message)}</div>`; return; }
    buildFilterUi();
    syncFilterUi();
    $('#tabs').onclick = (e) => { const b = e.target.closest('button[data-tab]'); if (b) setTab(b.dataset.tab); };
    $('#exportCsv').onclick = exportCsv;
    $('#copyLink').onclick = async () => { try { await navigator.clipboard.writeText(location.href); $('#copyLink').textContent = 'Gekopieerd'; setTimeout(() => { $('#copyLink').textContent = 'Link kopiëren'; }, 1500); } catch { prompt('Kopieer deze link:', location.href); } };
    $('#openFilters').onclick = () => $('#filters').classList.toggle('open');
    document.addEventListener('click', (e) => { const fp = $('#filters'); if (fp.classList.contains('open') && !fp.contains(e.target) && e.target.id !== 'openFilters') fp.classList.remove('open'); });
    window.addEventListener('resize', () => { Object.values(charts).forEach((c) => c.resize()); map && map.resize(); });
    setTab(TAB);
  }

  // Toegang: zelfde wachtwoord als het oude dashboard (alleen een drempel; de data zelf is geaggregeerd).
  async function sha256(s) { const b = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s)); return [...new Uint8Array(b)].map((x) => x.toString(16).padStart(2, '0')).join(''); }
  function unlock() { $('#gate').remove(); $('#app').classList.remove('hidden'); start(); }
  let remembered = false;
  try { remembered = sessionStorage.getItem('d2_ok') === window.D2_GATE_HASH; } catch { /* privémodus */ }
  if (remembered) unlock();
  else {
    $('#gatePw').focus();
    $('#gateForm').onsubmit = async (e) => {
      e.preventDefault();
      if ((await sha256($('#gatePw').value)) === window.D2_GATE_HASH) {
        try { sessionStorage.setItem('d2_ok', window.D2_GATE_HASH); } catch { /* geen opslag */ }
        unlock();
      } else { $('#gateErr').textContent = 'Onjuist wachtwoord'; $('#gatePw').value = ''; }
    };
  }
})();
