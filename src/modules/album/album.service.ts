import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {FindOneOptions, Repository} from 'typeorm';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dtos/create-album.dto';
import { UpdateAlbumDto } from './dtos/update-album.dto';
import {User} from "/@/modules/user/entities/user.entity";

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    const album = this.albumRepository.create(createAlbumDto);
    return this.albumRepository.save(album);
  }

  async findAll(): Promise<Album[]> {
    return this.albumRepository.find();
  }

  async findOne(id: number): Promise<Album> {
    const options: FindOneOptions<Album> = {
      where: { albumId: id }, // 确保字段名与实体定义相匹配
    };
    return this.albumRepository.findOne(options);
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    await this.albumRepository.update(id, updateAlbumDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.albumRepository.delete(id);
  }
}
