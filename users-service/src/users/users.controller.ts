import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from './dtos/login.dto';
import { usersResponse } from './utils/user-response.interface';
import { RegisterDto } from './dtos/register.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post('login')
  login(@Body() loginDto: LoginDto): Promise<usersResponse> {
    return this.usersService.login(loginDto);
  }

  @Post('register')
  register(@Body() registerDto: RegisterDto): Promise<usersResponse> {
    return this.usersService.register(registerDto);
  }
}
