/* Who's in Office, January 2027 — roster renderer (The Weber County Hive).
   Reads LEG2027 (from leg-roster-2027-data.js) and a districts layer
   (HOUSE_DISTRICTS or SENATE_DISTRICTS). Needs Leaflet for the map. */
(function () {
  var PC = { R: "#d64545", D: "#2f6fbf", U: "#e9c46a", F: "#e9c46a", C: "#e9c46a" };
  var PN = { R: "Republican", D: "Democrat", U: "Unaffiliated", F: "Forward Party", C: "Constitution" };
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function n(x) { return Number(x).toLocaleString("en-US"); }
  function towns(list) { return list.map(function (t) { return esc(t[0]) + (t[1] ? " (" + n(t[1]) + ")" : " (no 2020 count in state town data)"); }).join(", "); }

  window.legRoster = function (elId, mapId, districts) {
    var D = window.LEG2027, el = document.getElementById(elId);
    if (!D || !el) return;
    var seats = D.seats, cham = D.chamber === "H" ? "House" : "Senate";
    var c = D.change;
    var h = '<div class="lr-change"><div><b>' + c.after + '</b><span>after the 2026 election</span></div>' +
      '<div><b>' + c.before + '</b><span>before (2025&ndash;2026)</span></div>' +
      '<div><b>' + c.newCount + '</b><span>new members</span></div>' +
      '<div><b>' + c.flips + '</b><span>seats that changed party</span></div></div>';
    h += '<div class="lr-legend"><span><i style="background:' + PC.R + '"></i>Republican</span><span><i style="background:' + PC.D + '"></i>Democrat</span><span><i style="background:' + PC.U + '"></i>Unaffiliated or other</span><span><i class="lr-newbox"></i>New member</span></div>';
    h += '<div class="lr-tools"><input type="search" id="' + elId + '-q" placeholder="Search a name, town or county…"><div class="lr-pills">' +
      '<button data-f="all" class="on">All ' + seats.length + '</button><button data-f="new">New</button><button data-f="returning">Re-elected</button>' +
      (D.chamber === "S" ? '<button data-f="holdover">Not up until 2028</button>' : "") + "</div></div>";
    h += '<div class="lr-list" id="' + elId + '-list"></div>';
    el.innerHTML = h;
    var list = document.getElementById(elId + "-list");
    list.innerHTML = seats.map(function (s) {
      var res = "";
      if (s.result) {
        res = s.result.unopposed ? "Unopposed on Nov. 3" :
          "Won with " + n(s.result.votes) + " of " + n(s.result.total) + " votes (" + s.result.pct.toFixed(1) + "%); margin " + n(s.result.margin) + " over " + esc(s.result.runner);
      } else { res = "Not on the 2026 ballot"; }
      var area = '<b>Counties:</b> ' + esc(s.counties || "—");
      if (s.whole.length) area += '<br><b>Whole towns:</b> ' + towns(s.whole);
      if (s.part.length) area += '<br><b>Part of:</b> ' + towns(s.part);
      var link = s.link ? '<a class="lr-prof" href="' + esc(s.link) + '">Hive profile &rarr;</a>' : '<span class="lr-noprof">No profile yet</span>';
      var key = (s.name + " " + s.counties + " " + s.whole.concat(s.part).map(function (t) { return t[0]; }).join(" ")).toLowerCase();
      return '<article class="lr-row lr-' + s.status + '" id="' + elId + '-d' + s.d + '" data-s="' + s.status + '" data-k="' + esc(key) + '">' +
        '<div class="lr-dist" style="border-color:' + (PC[s.party] || "#999") + '">' + cham + '<b>' + s.d + '</b></div>' +
        '<div class="lr-body"><h3>' + esc(s.name) + ' <span class="lr-party" style="background:' + (PC[s.party] || "#999") + '">' + esc(PN[s.party] || s.party) + '</span>' +
        (s.status === "new" ? ' <span class="lr-new">New</span>' : "") + '</h3>' +
        '<p class="lr-note">(' + s.note + ')</p>' +
        '<p class="lr-area">' + area + '</p><p class="lr-res">' + res + '</p>' + link + '</div></article>';
    }).join("");
    var q = document.getElementById(elId + "-q"), f = "all";
    function apply() {
      var t = (q.value || "").toLowerCase();
      [].forEach.call(list.children, function (r) {
        var ok = (f === "all" || r.getAttribute("data-s") === f) && (!t || r.getAttribute("data-k").indexOf(t) >= 0);
        r.style.display = ok ? "" : "none";
      });
    }
    q.addEventListener("input", apply);
    [].forEach.call(el.querySelectorAll(".lr-pills button"), function (b) {
      b.addEventListener("click", function () {
        [].forEach.call(el.querySelectorAll(".lr-pills button"), function (x) { x.classList.remove("on"); });
        b.classList.add("on"); f = b.getAttribute("data-f"); apply();
      });
    });
    var mapEl = document.getElementById(mapId);
    if (mapEl && window.L && districts) {
      var bySeat = {}; seats.forEach(function (s) { bySeat[s.d] = s; });
      var map = L.map(mapId, { scrollWheelZoom: false, zoomSnap: 0.25 });
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 12, attribution: "&copy; OpenStreetMap contributors; districts: Utah UGRC" }).addTo(map);
      var layer = L.geoJSON(districts, {
        style: function (ft) {
          var s = bySeat[ft.properties.d] || {};
          return { color: s.status === "new" ? "#1d1d1d" : "#ffffff", weight: s.status === "new" ? 2.5 : 1, fillColor: PC[s.party] || "#bbb", fillOpacity: 0.55 };
        },
        onEachFeature: function (ft, ly) {
          var s = bySeat[ft.properties.d] || {};
          ly.bindTooltip(cham + " District " + ft.properties.d + ": " + esc(s.name) + " (" + (s.party || "") + ")", { sticky: true });
          ly.on("click", function () {
            var r = document.getElementById(elId + "-d" + ft.properties.d);
            if (r) { r.style.display = ""; r.scrollIntoView({ behavior: "smooth", block: "center" }); r.classList.add("lr-flash"); setTimeout(function () { r.classList.remove("lr-flash"); }, 1600); }
          });
        }
      }).addTo(map);
      map.fitBounds(layer.getBounds(), { padding: [10, 10] });
    }
  };
})();
