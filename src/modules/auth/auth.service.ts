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

  /**
   * 注册
   * @param createUserDto
   */
  async register(createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  /**
   * 登录
   * @param loginUserDto
   */
  async login(loginUserDto: LoginUserDto): Promise<{ access_token: string }> {
    const user = await this.userService.findByCredentials(loginUserDto);
    const payload: JwtPayload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * 验证用户
   * @param userId
   */
  async validateUser(userId: number): Promise<User> {
    return this.userService.findOne(userId);
  }

  /**
   * 验证用户密码
   * @param username
   * @param password
   */
  async validateUserByUsernameAndPassword(username: string, password: string): Promise<User> {
    const user = await this.userService.findByUsername(username);
    if (user && await this.userService.checkPassword(password, user.password)) {
      return user;
    }
    return null;
  }

}
