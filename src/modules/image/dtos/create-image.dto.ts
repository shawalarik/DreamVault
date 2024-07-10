import { IsNotEmpty, IsString, IsInt, IsBoolean, IsUrl, IsOptional } from 'class-validator';

export class CreateImageDto {
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsInt()
  size: number;

  @IsBoolean()
  isSafe: boolean;

  @IsInt()
  albumId: number;
}
