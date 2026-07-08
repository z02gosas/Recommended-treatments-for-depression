const map = L.map('map', {
  worldCopyJump: false,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
}).setView([20, 0], 2);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  subdomains: 'abcd',
  noWrap: true,
  attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
}).addTo(map);

const markers = L.markerClusterGroup();

fetch('data.json')
  .then(res => res.json())
  .then(records => {
    records.forEach(rec => {
      const marker = L.marker([rec.lat, rec.lng]);
      marker.bindPopup(rec.text);
      markers.addLayer(marker);
    });
    map.addLayer(markers);

    if (records.length > 0) {
      const bounds = L.latLngBounds(records.map(r => [r.lat, r.lng]));
      map.fitBounds(bounds, { padding: [30, 30] });
    }
  })
  .catch(err => console.error('Failed to load data.json:', err));
