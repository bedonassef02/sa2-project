import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LoginDto } from './dtos/login.dto';
import { PasswordService } from './services/password.service';
import { RegisterDto } from './dtos/register.dto';
import { Payload } from './utils/payload.interface';
import { TokenService } from './services/token.service';
import { usersResponse } from './utils/user-response.interface';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private passwordService: PasswordService,
        private tokenService: TokenService
    ) { }

    async register(registerDto: RegisterDto): Promise<usersResponse> {
        const dbUser: User | null = await this.findOne(registerDto.email);
        if (dbUser) {
            throw new BadRequestException('Email already exists');
        }
        registerDto.password = await this.passwordService.hash(registerDto.password)
        const user = await this.usersRepository.save(registerDto);
        return this.generateResponse(user);
    }

    async login(loginDto: LoginDto): Promise<usersResponse> {
        const user: User | null = await this.findOne(loginDto.email);
        if (!user || !(await this.passwordService.compare(loginDto.password, user.password))) {
            throw new BadRequestException('email or password mismatch our records');
        }
        return this.generateResponse(user);
    }



    async findOne(email: string): Promise<User | null> {
        return this.usersRepository.findOneBy({ email });
    }

    private createPayload(user: User): Payload {
        return {
            id: user.id,
            name: user.name,
            email: user.email
        }
    }

    private async generateResponse(user: User): Promise<usersResponse> {
        const payload: Payload = this.createPayload(user);
        const token = await this.tokenService.sign(payload);
        return {
            user: payload,
            token
        }
    }
}
