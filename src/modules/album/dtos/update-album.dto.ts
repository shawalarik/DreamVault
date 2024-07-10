import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAlbumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  description: string;
}
