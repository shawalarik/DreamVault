import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Whitelist } from './entities/whitelist.entity';
import { CreateWhitelistDto } from './dtos/create-whitelist.dto';

@Injectable()
export class WhitelistService {
  constructor(
    @InjectRepository(Whitelist)
    private readonly whitelistRepository: Repository<Whitelist>,
  ) {}

  /**
   * 添加白名单
   * @param createWhitelistDto
   */
  async addDomains(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist[]> {
    const whitelists = createWhitelistDto.domains.map(domain => this.whitelistRepository.create({ domain }));
    return this.whitelistRepository.save(whitelists);
  }

  /**
   * 获取白名单列表
   */
  async findAll(): Promise<Whitelist[]> {
    return this.whitelistRepository.find();
  }

  /**
   * 删除白名单
   * @param createWhitelistDto
   */
  async removeDomains(createWhitelistDto: CreateWhitelistDto): Promise<void> {
    await this.whitelistRepository.delete({ domain: In(createWhitelistDto.domains) });
  }
}
