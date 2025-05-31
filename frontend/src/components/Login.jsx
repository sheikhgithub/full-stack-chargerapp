import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/stations'); // Redirect to stations page
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm bg-white p-6 rounded-lg shadow-md mx-auto mt-10"
      noValidate
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value.trim())}
        required
        className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
        autoComplete="email"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-indigo-500 focus:ring-1 focus:ring-indigo-500"
        autoComplete="current-password"
        minLength={6}
      />

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 rounded font-semibold text-white transition ${
          loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
      >
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
