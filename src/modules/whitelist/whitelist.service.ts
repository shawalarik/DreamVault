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

  async addDomains(createWhitelistDto: CreateWhitelistDto): Promise<Whitelist[]> {
    const whitelists = createWhitelistDto.domains.map(domain => this.whitelistRepository.create({ domain }));
    return this.whitelistRepository.save(whitelists);
  }

  async findAll(): Promise<Whitelist[]> {
    return this.whitelistRepository.find();
  }

  async removeDomains(createWhitelistDto: CreateWhitelistDto): Promise<void> {
    await this.whitelistRepository.delete({ domain: In(createWhitelistDto.domains) });
  }
}
