/* Utah House Directory map. Draws every House district lightly and outlines the
   districts of the representatives in REPRESENTATIVES (weber-hive-house-data.js),
   with a line from each district to its name label.
   Use: uhMap('mapId')            -> all profiled districts
        uhMap('mapId', 14)        -> one district (profile pages) */
function uhMap(elId, onlyDist) {
  var el = document.getElementById(elId);
  if (!el || typeof L === 'undefined' || typeof HOUSE_DISTRICTS === 'undefined') return;
  var reps = (typeof REPRESENTATIVES !== 'undefined' ? REPRESENTATIVES : []).filter(function (r) { return r.dist; });
  if (onlyDist) reps = reps.filter(function (r) { return r.dist === onlyDist; });
  var byDist = {}; reps.forEach(function (r) { byDist[r.dist] = r; });
  var map = L.map(el, { scrollWheelZoom: false, zoomSnap: 0.25 });
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 14, attribution: '&copy; OpenStreetMap contributors; districts: Utah UGRC' }).addTo(map);
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var fmt = function (n) { return n ? Number(n).toLocaleString('en-US') : ''; };
  var bounds = [];
  L.geoJSON(HOUSE_DISTRICTS, {
    filter: function (f) { return !onlyDist || f.properties.d === onlyDist; },
    style: function (f) {
      var on = !!byDist[f.properties.d];
      return on ? { color: '#264653', weight: 3, fillColor: '#2a9d8f', fillOpacity: 0.35 }
                : { color: '#9aa9ad', weight: 1, fillColor: '#e6f1ee', fillOpacity: 0.15 };
    },
    onEachFeature: function (f, layer) {
      var p = f.properties, r = byDist[p.d];
      if (!r) { layer.bindTooltip('House District ' + p.d); return; }
      var whole = (p.whole || []).map(function (c) { return esc(c[0]) + (c[1] ? ' (' + fmt(c[1]) + ')' : ''); }).join(', ');
      var part = (p.part || []).map(esc).join(', ');
      var html = '<div style="font:15px/1.45 Georgia,serif;max-width:280px"><b style="font-size:17px">House District ' + p.d + '</b><br>' +
        (r.status === 'live' ? '<a href="' + esc(r.link) + '">' + esc(r.name) + '</a>' : esc(r.name)) +
        '<br><span style="font-size:13px">Drawn from the 2020 Census to hold about 43,622 people.</span>' +
        (whole ? '<br><b>Whole cities and towns:</b> ' + whole : '') +
        (part ? '<br><b>Part of:</b> ' + part : '') +
        '<br><span style="font-size:12px;color:#3d6470">City numbers are each whole city\'s 2020 Census count.</span></div>';
      layer.bindPopup(html);
      bounds.push(layer.getBounds());
      if (r.label && !onlyDist) {
        var from = [p.lat, p.lng], to = r.label;
        L.polyline([from, to], { color: '#264653', weight: 2, dashArray: '4 4' }).addTo(map);
        L.circleMarker(from, { radius: 4, color: '#264653', fillColor: '#e9c46a', fillOpacity: 1, weight: 2 }).addTo(map);
        var right = to[1] > from[1];
        var m = L.marker(to, { icon: L.divIcon({ className: 'uh-lbl', html: '<span class="uh-lbl-in' + (right ? '' : ' uh-lbl-l') + '">HD ' + p.d + ' &middot; ' + esc(r.name.replace(/^Rep\. /, '')) + '</span>', iconSize: [0, 0] }) }).addTo(map);
        m.on('click', function () { layer.openPopup(); });
        bounds.push(L.latLngBounds([to, to]));
      }
    }
  }).addTo(map);
  if (bounds.length) { var b = bounds[0]; bounds.forEach(function (x) { b = b.extend(x); }); map.fitBounds(b, onlyDist ? { padding: [20, 20] } : { paddingTopLeft: [230, 20], paddingBottomRight: [230, 20] }); }
  else map.setView([40.6, -111.9], 8);
}

/* Table under the map: one row per profiled district, largest print. */
function uhTable(elId) {
  var el = document.getElementById(elId);
  if (!el || typeof HOUSE_DISTRICTS === 'undefined' || typeof REPRESENTATIVES === 'undefined') return;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var props = {}; HOUSE_DISTRICTS.features.forEach(function (f) { props[f.properties.d] = f.properties; });
  var rows = REPRESENTATIVES.filter(function (r) { return r.dist; }).sort(function (a, b) { return a.dist - b.dist; }).map(function (r) {
    var p = props[r.dist] || {};
    var whole = (p.whole || []).map(function (c) { return esc(c[0]) + (c[1] ? ' (' + Number(c[1]).toLocaleString('en-US') + ')' : ''); }).join(', ') || '&mdash;';
    var part = (p.part || []).map(esc).join(', ') || '&mdash;';
    var who = r.status === 'live' ? '<a href="' + esc(r.link) + '">' + esc(r.name) + '</a>' : esc(r.name);
    return '<tr><td style="white-space:nowrap"><b>HD ' + r.dist + '</b></td><td>' + who + '</td><td>' + whole + '</td><td>' + part + '</td></tr>';
  }).join('');
  el.innerHTML = '<div style="overflow-x:auto"><table class="uh-table"><thead><tr><th>District</th><th>Representative</th><th>Whole cities and towns (2020 Census)</th><th>Part of</th></tr></thead><tbody>' + rows + '</tbody></table></div>';
}
