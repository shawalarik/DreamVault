import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { User } from '../user/entities/user.entity';
import { LoginUserDto } from './dtos/login-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByCredentials(loginUserDto);
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }
  async validateUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (user && await this.userService.checkPassword(password, user.password)) {
      return user;
    }
    return null;
  }

}
