import { Controller, Post, Delete, Body, Get } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dtos/create-whitelist.dto';

@Controller('whitelist')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Post()
  async add(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.whitelistService.addDomains(createWhitelistDto);
  }

  @Get()
  async findAll() {
    return this.whitelistService.findAll();
  }

  @Delete()
  async remove(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.whitelistService.removeDomains(createWhitelistDto);
  }
}
