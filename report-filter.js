(() => {
  'use strict';

  const integer = new Intl.NumberFormat('ja-JP');
  const normalize = (value) => String(value || '').normalize('NFKC').toLocaleLowerCase('ja-JP');

  function setup(root) {
    const form = root.querySelector('[data-filter-form]');
    const body = root.querySelector('tbody');
    const markers = Array.from(root.querySelectorAll('[data-filter]'));
    const rows = markers.map((marker) => {
      const row = marker.closest('tr');
      const kind = { d: 'detected', r: 'routine', u: 'unidentified', i: 'iot' }[marker.dataset.filter[0]];
      row.dataset.kind = kind;
      row.dataset.cve = marker.dataset.filter[1] === '1' ? 'yes' : 'no';
      row.dataset.method = marker.textContent.trim();
      row.dataset.status = row.querySelector('.status-code').textContent.trim();
      row.dataset.count = row.querySelector('.count-cell').textContent.replaceAll(',', '').trim();
      row.dataset.lastSeen = row.querySelector('time').dateTime;
      row.dataset.path = row.querySelector('.request-path').textContent.trim();
      return row;
    });
    const result = root.querySelector('[data-filter-result]');
    const empty = root.querySelector('[data-filter-empty]');
    const pageState = root.querySelector('[data-page-state]');
    const previous = root.querySelector('[data-page-prev]');
    const next = root.querySelector('[data-page-next]');
    if (!form || !body || !rows.length || !result || !empty || !pageState || !previous || !next) return;

    rows.forEach((row, index) => { row.dataset.originalOrder = String(index); });
    let page = 0;

    function filteredRows() {
      const data = new FormData(form);
      const query = normalize(data.get('query'));
      const kind = String(data.get('kind') || 'all');
      const cve = String(data.get('cve') || 'all');
      const method = String(data.get('method') || 'all');
      const status = String(data.get('status') || 'all');
      const excludeRoutine = data.get('exclude_routine') === 'on';
      return rows.filter((row) => {
        if (query && !normalize(row.textContent).includes(query)) return false;
        if (kind !== 'all' && row.dataset.kind !== kind) return false;
        if (cve !== 'all' && row.dataset.cve !== cve) return false;
        if (method !== 'all' && row.dataset.method !== method) return false;
        if (status !== 'all' && row.dataset.status !== status) return false;
        if (excludeRoutine && row.dataset.kind === 'routine') return false;
        return true;
      });
    }

    function compare(sort) {
      if (sort === 'latest') return (a, b) => b.dataset.lastSeen.localeCompare(a.dataset.lastSeen);
      if (sort === 'path') return (a, b) => a.dataset.path.localeCompare(b.dataset.path, 'ja');
      if (sort === 'cve') return (a, b) => Number(b.dataset.cve === 'yes') - Number(a.dataset.cve === 'yes') || Number(b.dataset.count) - Number(a.dataset.count);
      return (a, b) => Number(b.dataset.count) - Number(a.dataset.count) || Number(a.dataset.originalOrder) - Number(b.dataset.originalOrder);
    }

    function apply() {
      const matches = filteredRows();
      const sort = String(new FormData(form).get('sort') || 'count');
      matches.sort(compare(sort));
      matches.forEach((row) => body.appendChild(row));
      rows.forEach((row) => { row.hidden = true; });

      const sizeValue = String(new FormData(form).get('page_size') || '25');
      const pageSize = sizeValue === 'all' ? Math.max(matches.length, 1) : Number(sizeValue);
      const pages = Math.max(1, Math.ceil(matches.length / pageSize));
      page = Math.min(page, pages - 1);
      const start = page * pageSize;
      const visible = matches.slice(start, start + pageSize);
      visible.forEach((row) => { row.hidden = false; });
      const requestCount = matches.reduce((sum, row) => sum + Number(row.dataset.count || 0), 0);

      result.textContent = `${integer.format(matches.length)}行 / ${integer.format(requestCount)}件`;
      pageState.textContent = matches.length ? `${page + 1} / ${pages}` : '0 / 0';
      previous.disabled = page === 0 || !matches.length;
      next.disabled = page >= pages - 1 || !matches.length;
      empty.hidden = matches.length !== 0;
    }

    form.addEventListener('input', () => { page = 0; apply(); });
    form.addEventListener('change', () => { page = 0; apply(); });
    form.addEventListener('reset', () => { window.setTimeout(() => { page = 0; apply(); }, 0); });
    previous.addEventListener('click', () => { if (page > 0) { page -= 1; apply(); } });
    next.addEventListener('click', () => { page += 1; apply(); });
    apply();
  }

  document.querySelectorAll('[data-filter-table]').forEach(setup);
})();
