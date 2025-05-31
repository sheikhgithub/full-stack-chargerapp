import React, { useState } from 'react';
import { FaPlug, FaBolt, FaMapMarkerAlt } from "react-icons/fa";

const dummyStations = [
  {
    _id: '1',
    name: 'Station One',
    status: 'Active',
    powerOutput: 50,
    connectorType: 'Type1',
    location: { lat: 19.0760, lng: 72.8777 }
  },
  {
    _id: '2',
    name: 'Station Two',
    status: 'Inactive',
    powerOutput: 22,
    connectorType: 'CCS',
    location: { lat: 28.7041, lng: 77.1025 }
  },
  {
    _id: '3',
    name: 'Station Three',
    status: 'Active',
    powerOutput: 100,
    connectorType: 'CHAdeMO',
    location: { lat: 13.0827, lng: 80.2707 }
  }
];

function StationList() {
  const [stations, setStations] = useState(dummyStations);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (loading) {
    return (
      <div className="text-center text-xl font-medium text-indigo-700 mt-10">
        Loading stations...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 font-semibold mt-10">
        {error}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1593941707874-ef25b8b4a92c?auto=format&fit=crop&w=1740&q=80')",
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="bg-white bg-opacity-80 backdrop-blur-md rounded-3xl p-8 max-w-7xl mx-auto shadow-xl">
        <h2 className="text-4xl font-bold text-indigo-800 mb-10 text-center">
          ⚡ Available Charging Stations
        </h2>

        {stations.length === 0 ? (
          <p className="text-gray-600 text-center">No stations found.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stations.map((station) => (
              <div
                key={station._id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:scale-105"
              >
                <img
                  src="https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=800&q=80"
                  alt="EV Charger"
                  className="w-full h-40 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-bold text-indigo-700 mb-2">
                    {station.name}
                  </h3>
                  <p className="text-gray-700 mb-1">
                    <FaPlug className="inline text-green-600 mr-1" />
                    <strong>Status:</strong> {station.status}
                  </p>
                  <p className="text-gray-700 mb-1">
                    <FaBolt className="inline text-yellow-500 mr-1" />
                    <strong>Power:</strong> {station.powerOutput} kW
                  </p>
                  <p className="text-gray-700 mb-1">
                    🔗 <strong>Connector:</strong> {station.connectorType}
                  </p>
                  <p className="text-sm text-gray-600 mt-2">
                    <FaMapMarkerAlt className="inline mr-1" />
                    ({station.location.lat.toFixed(4)}, {station.location.lng.toFixed(4)})
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StationList;
