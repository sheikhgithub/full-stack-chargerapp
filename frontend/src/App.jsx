import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import StationList from './components/StationList';
import MapView from './components/mapview';

function Home() {
  const [showLogin, setShowLogin] = React.useState(true);

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-white px-4 py-10"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1470&q=80')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="bg-black bg-opacity-50 rounded-3xl p-10 w-full max-w-md shadow-lg">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 drop-shadow-md text-center">
          ⚡ EV Charger App
        </h1>

        <div className="flex rounded-xl overflow-hidden shadow-lg mb-8">
          <button
            onClick={() => setShowLogin(true)}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
              showLogin
                ? 'bg-white text-indigo-700'
                : 'bg-indigo-300 text-white hover:bg-indigo-400'
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setShowLogin(false)}
            className={`px-6 py-3 text-lg font-semibold transition-all duration-300 ${
              !showLogin
                ? 'bg-white text-indigo-700'
                : 'bg-indigo-300 text-white hover:bg-indigo-400'
            }`}
          >
            Signup
          </button>
        </div>

        <div
          className="w-full p-6 rounded-2xl shadow-lg relative overflow-hidden"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay for better readability */}
          <div className="absolute inset-0 bg-black opacity-40 rounded-2xl z-0"></div>

          {/* Content container with higher z-index */}
          <div className="relative z-10 bg-white bg-opacity-90 rounded-2xl p-6 text-black">
            {showLogin ? <Login /> : <Signup />}
          </div>
        </div>
      </div>
    </div>
  );
}

// Navbar component with active link highlight
function Navbar() {
  const location = useLocation();

  const linkClass = (path) =>
    `hover:text-yellow-300 transition duration-200 ${
      location.pathname === path ? 'text-yellow-400 font-bold underline' : ''
    }`;

  return (
    <nav className="bg-indigo-800 shadow-lg text-white py-4 px-6 flex justify-center gap-8 font-medium text-lg sticky top-0 z-50">
      <Link to="/stations" className={linkClass('/stations')}>
        🚉 Stations
      </Link>
      <Link to="/map" className={linkClass('/map')}>
        🗺️ Map View
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/stations"
          element={
            <>
              <Navbar />
              <StationList />
            </>
          }
        />
        <Route
          path="/map"
          element={
            <>
              <Navbar />
              <MapView />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
