import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  JwtModule.register({
    global: true,
    secret: "jwt-secret",
    signOptions: { expiresIn: '30d' },
  }),],
  controllers: [UsersController],
  providers: [UsersService, PasswordService, TokenService],
})
export class UsersModule { }
