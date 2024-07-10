import { IsNotEmpty, IsString, IsInt, IsBoolean, IsUrl, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateImageDto {
  @ApiProperty({ description: '图片URL', example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({ description: '图片名称', example: 'example.jpg' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: '图片描述', example: '这是一个示例图片' })
  @IsString()
  description: string;

  @ApiProperty({ description: '图片大小', example: 1024 })
  @IsInt()
  size: number;

  @ApiProperty({ description: '图片类型', example: 'image/jpeg' })
  @IsBoolean()
  isSafe: boolean;

  @ApiProperty({ description: '图片唯一标识ID', example: 1 })
  @IsInt()
  albumId: number;
}
