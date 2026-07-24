// src/app.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class AppService {
  async getGithubProfile(username: string) {
    // 1. Hacemos la petición a la API pública de GitHub
    const response = await fetch(`https://api.github.com/users/${username}`);

    // 2. Si el usuario no existe o la API falla, lanzamos una excepción
    if (!response.ok) {
      throw new NotFoundException(`Usuario de GitHub '${username}' no encontrado`);
    }

    // 3. Convertimos la respuesta a JSON
    const data = await response.json();

    // 4. Retornamos solo la información relevante que usará el frontend
    return {
      username: data.login,
      name: data.name || data.login,
      avatar_url: data.avatar_url,
      bio: data.bio || 'Sin biografía disponible',
      public_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      html_url: data.html_url,
      location: data.location || 'No especificada',
    };
  }
}