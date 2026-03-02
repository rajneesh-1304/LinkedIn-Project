import { Module, Controller, Get, UseGuards } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './data-source';
import { FirebaseAuthGuard } from './firebase-auth.guard';
import { UserModule } from './users/user.module';

@Controller()
class AppController {
  @UseGuards(FirebaseAuthGuard)
  @Get()
  root() {
    return { message: 'NestJS Backend is running!' };
  }
}

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceOptions, 
    }),

    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
