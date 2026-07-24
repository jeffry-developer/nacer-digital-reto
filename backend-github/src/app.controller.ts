// src/app.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Definimos el endpoint GET /user/:username
  @Get('user/:username')
  getUserProfile(@Param('username') username: string) {
    // Delegamos la tarea al servicio
    return this.appService.getGithubProfile(username);
  }
}