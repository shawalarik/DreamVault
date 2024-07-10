import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Whitelist } from '../modules/whitelist/entities/whitelist.entity';

@Injectable()
export class AntiHotlinkMiddleware implements NestMiddleware {
  constructor(
    @InjectRepository(Whitelist)
    private readonly whitelistRepository: Repository<Whitelist>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const referer = req.get('Referer');
    if (!referer) {
      throw new UnauthorizedException('No referer provided');
    }

    const refererHost = new URL(referer).host;
    const whitelist = await this.whitelistRepository.findOne({ where: { domain: refererHost } });

    if (!whitelist) {
      throw new UnauthorizedException('Referer not allowed');
    }

    next();
  }
}
