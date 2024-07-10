import { Controller, Post, Get, Delete, Body, Param } from '@nestjs/common';
import { FeaturedImageService } from './featured-image.service';
import {FindOneOptions} from "typeorm";
import {Album} from "/@/modules/album/entities/album.entity";
import {Image} from "/@/modules/image/entities/image.entity";

@Controller('featured-images')
export class FeaturedImageController {
  constructor(private readonly featuredImageService: FeaturedImageService) {}

  @Post()
  async add(@Body('imageId') imageId: number) {
    const imageOptions: FindOneOptions<Image> = {
      where: { imageId: imageId }, // 确保字段名与实体定义相匹配
      relations: ['album', 'user']
    };
    return this.featuredImageService.addFeaturedImage(imageOptions);
  }

  @Get()
  async findAll() {
    return this.featuredImageService.findAll();
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.featuredImageService.remove(id);
  }
}
