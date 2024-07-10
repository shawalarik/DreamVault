import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'username', passwordField: 'password' });
  }

  /**
   * 验证用户
   * @param username
   * @param password
   */
  async validate(username: string, password: string): Promise<User> {
    const user = await this.authService.validateUserByUsernameAndPassword(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
