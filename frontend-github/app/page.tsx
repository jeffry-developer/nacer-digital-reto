'use client';

import { useEffect, useState } from 'react';

// Definimos la estructura de datos que nos devuelve NestJS
interface GithubProfile {
  username: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string;
}

export default function Home() {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Reemplaza esta URL con la de tu backend cuando lo despliegues
  const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';

  useEffect(() => {
    // Al cargar el componente, consultamos nuestro propio backend NestJS
    fetch(`${API_URL}/user/jeffry-programer`)
      .then((res) => {
        if (!res.ok) throw new Error('No se pudo obtener el perfil');
        return res.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-white">
        <p className="text-xl animate-pulse">Cargando perfil desde NestJS...</p>
      </main>
    );
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-900 text-red-400">
        <p>Error: {error || 'No se pudo cargar la información'}</p>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-6 text-white">
      <div className="max-w-sm w-full bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 text-center">
        <img
          src={profile.avatar_url}
          alt={profile.name}
          className="w-32 h-32 rounded-full mx-auto border-4 border-indigo-500 mb-4"
        />
        <h1 className="text-2xl font-bold">{profile.name}</h1>
        <p className="text-indigo-400 text-sm mb-2">@{profile.username}</p>
        <p className="text-gray-300 text-sm mb-4">{profile.bio}</p>

        <div className="flex justify-around bg-gray-700/50 rounded-lg p-3 mb-4 text-sm">
          <div>
            <span className="block font-bold text-lg">{profile.public_repos}</span>
            <span className="text-gray-400 text-xs">Repos</span>
          </div>
          <div>
            <span className="block font-bold text-lg">{profile.followers}</span>
            <span className="text-gray-400 text-xs">Seguidores</span>
          </div>
          <div>
            <span className="block font-bold text-lg">{profile.following}</span>
            <span className="text-gray-400 text-xs">Siguiendo</span>
          </div>
        </div>

        <a
          href={profile.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Ver en GitHub
        </a>
      </div>
    </main>
  );
}