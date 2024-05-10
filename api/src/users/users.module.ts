import { Module } from '@nestjs/common';
import { UserController } from '../users/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserService } from '../users/users.service';
import { PasswordService } from '../users/password/password.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PasswordService,
    
  ],
})
export class UserModule {}