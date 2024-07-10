import { IsArray, IsString, ArrayMinSize } from 'class-validator';

export class CreateWhitelistDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  domains: string[];
}
