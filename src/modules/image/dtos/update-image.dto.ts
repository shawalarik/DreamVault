import { IsNotEmpty, IsString, IsInt, IsBoolean } from 'class-validator';

export class UpdateImageDto {
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
