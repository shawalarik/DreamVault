import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImageService } from './image.service';
import { ImageController } from './image.controller';
import { Image } from './entities/image.entity';
import { Album } from '../album/entities/album.entity';
import { User } from '../user/entities/user.entity';
import { ImageRepository } from './image.repository';
@Module({
  imports: [TypeOrmModule.forFeature([Image, Album, User, ImageRepository])],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [TypeOrmModule], // 确保 TypeOrmModule 被导出
})
export class ImageModule {}
