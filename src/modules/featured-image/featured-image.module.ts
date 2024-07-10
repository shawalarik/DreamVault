import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeaturedImageService } from './featured-image.service';
import { FeaturedImageController } from './featured-image.controller';
import { FeaturedImage } from './entities/featured-image.entity';
import { Image } from '../image/entities/image.entity';
import { ImageModule } from '../image/image.module'; // 导入 ImageModule
@Module({
  imports: [
    TypeOrmModule.forFeature([FeaturedImage]),
    ImageModule,
  ],
  providers: [FeaturedImageService],
  controllers: [FeaturedImageController],
})
export class FeaturedImageModule {}
