import { Controller, Post, Get, Put, Delete, Body, UploadedFile, UseInterceptors, Req, Query, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { CreateImageDto } from './dtos/create-image.dto';
import { UpdateImageDto } from './dtos/update-image.dto';
import { Request } from 'express';
import { ApiOperation, ApiResponse, ApiTags, ApiQuery, ApiParam } from '@nestjs/swagger';
import { UserPayload } from "/@/modules/user/entities/user.interface";


@Controller('images')
@ApiTags('上传图片相关')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  /**
   * 上传图片接口
   * @param createImageDto 包含图片信息的DTO
   * @param file 上传的文件
   * @param req 请求对象，假设包含用户ID
   */
  @Post('upload')
  @ApiOperation({ summary: '上传图片' })
  @ApiQuery({ name: 'albumId', description: '图片ID', required: true })
  @ApiResponse({ status: 200, description: '上传成功', type: CreateImageDto })
  @ApiResponse({ status: 400, description: '上传失败' })
  @ApiParam({ name: 'albumId', description: '图片ID' })
  @UseInterceptors(FileInterceptor('file'))
  async upload(
    @Body() createImageDto: CreateImageDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ) {
    const user = req.user as UserPayload; // 强制转换为UserPayload类型
    const userId = user.userId; // 假设用户ID在请求中可用
    return this.imageService.uploadImage(createImageDto, file, userId);
  }

  /**
   * 获取所有图片接口
   * @param albumId 专辑ID
   * @param page 页码
   * @param limit 每页数量
   * @param keyword 关键词
   */
  @Get()
  @ApiOperation({ summary: '获取所有图片' })
  @ApiQuery({ name: 'albumId', description: '专辑ID', required: true })
  @ApiQuery({ name: 'page', description: '页码', required: false })
  @ApiQuery({ name: 'limit', description: '每页数量', required: false })
  @ApiQuery({ name: 'keyword', description: '关键词', required: false })
  @ApiResponse({ status: 200, description: '获取成功', type: [CreateImageDto] })
  async findAll(
    @Query('albumId') albumId: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('keyword') keyword: string,
  ) {
    return this.imageService.findAll({ albumId: +albumId, page, limit, keyword });
  }

  /**
   * 获取单张图片接口
   * @param id 图片ID
   */
  @Get(':id')
  @ApiOperation({ summary: '获取单张图片' })
  async findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  /**
   * 更新图片信息接口
   * @param id 图片ID
   * @param updateImageDto 更新图片信息的DTO
   */
  @Put(':id')
  @ApiOperation({ summary: '更新图片信息' })
  async update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  /**
   * 删除图片接口
   * @param id 图片ID
   */
  @Delete(':id')
  @ApiOperation({ summary: '删除图片' })
  async remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }
}
