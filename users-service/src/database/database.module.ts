import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('POSTGRES_HOST') || 'postgres',
        port: configService.get<number>('POSTGRES_PORT') || 5432,
        username: configService.get<string>('POSTGRES_USER') || 'bedo',
        password: configService.get<string>('POSTGRES_PASSWORD') || 'pass123',
        database: configService.get<string>('POSTGRES_DB') || 'users-db',
        entities: [User],
        synchronize: true,
      }),
    }),
  ],
})
export class DatabaseModule { }