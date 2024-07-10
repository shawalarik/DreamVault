import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { CreateImageDto } from './dtos/create-image.dto';
import { UpdateImageDto } from './dtos/update-image.dto';
import * as sharp from 'sharp';
import axios from 'axios';
import * as tough from 'tough-cookie';
import { User } from '../user/entities/user.entity';
import { Album } from '../album/entities/album.entity';
import { Buffer } from 'buffer';
import { wrapper } from "axios-cookiejar-support";  // 从 'buffer' 模块导入 Buffer 类型

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  /**
   * 上传图片
   * @param createImageDto
   * @param file
   * @param userId
   */
  async uploadImage(createImageDto: CreateImageDto, file: Express.Multer.File, userId: number): Promise<Image> {
    let buffer: Buffer;

    if (file) {
      buffer = await sharp(file.buffer).toFormat('png').toBuffer() as Buffer;  // 使用 'as Buffer' 强制转换
    } else if (createImageDto.url) {
      buffer = await this.downloadImage(createImageDto.url);
    } else {
      throw new Error('No file or URL provided');
    }

    const timestamp = Date.now();
    const imageName = `${timestamp}.png`;
    const imagePath = `uploads/${imageName}`;

    await sharp(buffer).toFile(imagePath);

    const mediumImagePath = `uploads/${timestamp}-medium.png`;
    const thumbnailImagePath = `uploads/${timestamp}-thumbnail.png`;

    await sharp(buffer).resize({ width: 800 }).toFile(mediumImagePath);
    await sharp(buffer).resize({ width: 200 }).toFile(thumbnailImagePath);
    const userOptions: FindOneOptions<User> = {
      where: { userId: userId }, // 确保字段名与实体定义相匹配
    };
    const user = await this.userRepository.findOne(userOptions);
    if (!user) {
      throw new Error('User not found');
    }
    const albumOptions: FindOneOptions<Album> = {
      where: { albumId: createImageDto.albumId }, // 确保字段名与实体定义相匹配
    };
    const album = await this.albumRepository.findOne(albumOptions);
    if (!album) {
      throw new Error('Album not found');
    }

    // 确保所有必需字段都被传递
    const image = this.imageRepository.create({
      ...createImageDto,
      url: imagePath,
      name: imageName,
      size: buffer.length,
      user,
      album,
      uploadedAt: new Date(),
    });

    return this.imageRepository.save(image);
  }

  /**
   * 获取所有图片
   * @param url
   * @private
   */
  private async downloadImage(url: string): Promise<Buffer> {
    const cookieJar = new tough.CookieJar();
    const axiosInstance = wrapper(axios.create({ jar: cookieJar, withCredentials: true }));

    try {
      const response = await axiosInstance.get(url, {
        responseType: 'arraybuffer',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Referer': url,
        },
      });
      return Buffer.from(response.data);
    } catch (error) {
      throw new UnauthorizedException('Failed to download image due to anti-hotlinking measures.');
    }
  }

  /**
   * 更新图片信息
   * @param query
   */
  async findAll(query: any): Promise<Image[]> {
    const { albumId, page = 1, limit = 10, keyword } = query;
    const qb = this.imageRepository.createQueryBuilder('image')
      .leftJoinAndSelect('image.album', 'album')
      .leftJoinAndSelect('image.user', 'user');

    if (albumId) {
      qb.andWhere('image.albumId = :albumId', { albumId });
    }

    if (keyword) {
      qb.andWhere('image.name LIKE :keyword OR image.description LIKE :keyword', { keyword: `%${keyword}%` });
    }

    qb.skip((page - 1) * limit).take(limit);

    return qb.getMany();
  }

  /**
   * 获取单个图片
   * @param id
   */
  async findOne(id: number): Promise<Image> {
    const imageOptions: FindOneOptions<Image> = {
      where: { imageId: id }, // 确保字段名与实体定义相匹配
      relations: ['album', 'user']
    };
    const image = await this.imageRepository.findOne(imageOptions);
    if (!image) {
      throw new Error('Image not found');
    }
    return image;
  }

  /**
   * 更新图片信息
   * @param id
   * @param updateImageDto
   */
  async update(id: number, updateImageDto: UpdateImageDto): Promise<Image> {
    await this.imageRepository.update(id, updateImageDto);
    return this.findOne(id);
  }

  /**
   * 删除图片
   * @param id
   */
  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Image not found');
    }
  }
}
