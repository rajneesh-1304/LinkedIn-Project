import { Controller, Get,  UseGuards, Req  } from '@nestjs/common';
import { AppService } from './app.service';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(FirebaseAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}