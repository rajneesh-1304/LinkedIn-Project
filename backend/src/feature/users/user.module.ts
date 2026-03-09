import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/domain/entity/user.entity';
import { PublisherService } from './publisher.service';
import { RabbitConnection } from 'src/infra/rabbitMq/rabbit.connection';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, PublisherService, RabbitConnection],
})
export class UserModule {}
