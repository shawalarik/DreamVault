import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import { FeaturedImage } from './entities/featured-image.entity';
import { Image } from '../image/entities/image.entity';
import { ImageRepository } from '../image/image.repository';
@Injectable()
export class FeaturedImageService {
  constructor(
    @InjectRepository(FeaturedImage)
    private readonly featuredImageRepository: Repository<FeaturedImage>,
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  /**
   * 添加推荐图片
   * @param imageId
   */
  async addFeaturedImage(imageId: FindOneOptions<Image>): Promise<FeaturedImage> {
    const image = await this.imageRepository.findOne(imageId);
    const featuredImage = this.featuredImageRepository.create({ image });
    return this.featuredImageRepository.save(featuredImage);
  }

  /**
   * 获取所有推荐图片
   */
  async findAll(): Promise<FeaturedImage[]> {
    return this.featuredImageRepository.find({ relations: ['image'] });
  }

  /**
   * 删除推荐图片
   * @param id
   */
  async remove(id: number): Promise<void> {
    await this.featuredImageRepository.delete(id);
  }
}
