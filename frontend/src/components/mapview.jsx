import React, { useEffect, useState } from 'react';

// For maps, let's use react-leaflet (OpenStreetMap)
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Fix default icon issue for leaflet in React:
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapView() {
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStations() {
      try {
        const res = await fetch('http://localhost:5000/api/stations');
        const data = await res.json();
        if (res.ok) setStations(data);
        else setError(data.message || 'Error fetching stations');
      } catch {
        setError('Failed to connect to server');
      } finally {
        setLoading(false);
      }
    }
    fetchStations();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading map...</div>;
  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  // Center map on average coordinates or fallback to some city
  const avgLat =
    stations.reduce((sum, s) => sum + s.location.lat, 0) / stations.length || 19.076; // Mumbai lat
  const avgLng =
    stations.reduce((sum, s) => sum + s.location.lng, 0) / stations.length || 72.8777; // Mumbai lng

  return (
    <div className="p-6 h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">⚡ Charger Map View</h2>
      <MapContainer center={[avgLat, avgLng]} zoom={12} style={{ height: '80vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        {stations.map((station) => (
          <Marker key={station._id} position={[station.location.lat, station.location.lng]}>
            <Popup>
              <strong>{station.name}</strong> <br />
              Status: {station.status} <br />
              Power: {station.powerOutput} kW <br />
              Connector: {station.connectorType}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
