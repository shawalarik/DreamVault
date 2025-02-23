import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOneOptions } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './../auth/dtos/login-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * 创建用户
   * @param createUserDto
   */
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  /**
   * 根据 id 查询用户
   * @param id
   */
  async findOne(id: number): Promise<User | undefined> {
    const options: FindOneOptions<User> = {
      where: { userId: id }, // 确保字段名与实体定义相匹配
    };
    return this.userRepository.findOne(options);
  }

  /**
   * 根据用户名查询用户
   * @param loginUserDto
   */
  async findByCredentials(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username: loginUserDto.username } });
    if (user && await bcrypt.compare(loginUserDto.password, user.password)) {
      return user;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  /**
   * 根据用户名查询用户
   * @param username
   */
  async findByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ where: { username } });
  }

  /**
   * 更新用户信息
   * @param password
   * @param hash
   */
  async checkPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
