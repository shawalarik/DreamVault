import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FeaturedImageService } from './featured-image.service';
import {FindOneOptions} from "typeorm";
import {Album} from "/@/modules/album/entities/album.entity";
import {Image} from "/@/modules/image/entities/image.entity";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('featured-images')
@ApiTags('推荐图片相关')
export class FeaturedImageController {
  constructor(private readonly featuredImageService: FeaturedImageService) {}

  @Post()
  @ApiOperation({ summary: '添加推荐图片' })
  async add(@Body('imageId') imageId: number) {
    const imageOptions: FindOneOptions<Image> = {
      where: { imageId: imageId }, // 确保字段名与实体定义相匹配
      relations: ['album', 'user']
    };
    return this.featuredImageService.addFeaturedImage(imageOptions);
  }

  @Get()
  @ApiOperation({ summary: '获取所有推荐图片' })
  async findAll() {
    return this.featuredImageService.findAll();
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除推荐图片' })
  async remove(@Param('id') id: number) {
    return this.featuredImageService.remove(id);
  }
}
