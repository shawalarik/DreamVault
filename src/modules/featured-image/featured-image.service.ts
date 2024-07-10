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

  async addFeaturedImage(imageId: FindOneOptions<Image>): Promise<FeaturedImage> {
    const image = await this.imageRepository.findOne(imageId);
    const featuredImage = this.featuredImageRepository.create({ image });
    return this.featuredImageRepository.save(featuredImage);
  }

  async findAll(): Promise<FeaturedImage[]> {
    return this.featuredImageRepository.find({ relations: ['image'] });
  }

  async remove(id: number): Promise<void> {
    await this.featuredImageRepository.delete(id);
  }
}
