import { Controller, Post, Get, Put, Delete, Body, Param } from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('albums')
@ApiTags('相册相关')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ summary: '创建相册' })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ summary: '获取所有相册' })
  async findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: '获取单个相册' })
  async findOne(@Param('id') id: string) {
    return this.albumService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: '更新相册' })
  async update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(+id, updateAlbumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除相册' })
  async remove(@Param('id') id: string) {
    return this.albumService.remove(+id);
  }
}
