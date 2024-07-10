import { Controller, Post, Delete, Body, Get } from '@nestjs/common';
import { WhitelistService } from './whitelist.service';
import { CreateWhitelistDto } from './dtos/create-whitelist.dto';
import {ApiOperation, ApiTags} from '@nestjs/swagger';

@Controller('whitelist')
@ApiTags('防盗链白名单管理')
export class WhitelistController {
  constructor(private readonly whitelistService: WhitelistService) {}

  @Post()
  @ApiOperation({ summary: '添加白名单' })
  async add(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.whitelistService.addDomains(createWhitelistDto);
  }

  @Get()
  @ApiOperation({ summary: '获取白名单列表' })
  async findAll() {
    return this.whitelistService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: '删除白名单' })
  async remove(@Body() createWhitelistDto: CreateWhitelistDto) {
    return this.whitelistService.removeDomains(createWhitelistDto);
  }
}
