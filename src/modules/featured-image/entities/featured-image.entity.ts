import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Image } from '../../image/entities/image.entity';

@Entity('featured_images')
export class FeaturedImage {
  @PrimaryGeneratedColumn('increment')
  featuredImageId: number;

  @ManyToOne(() => Image)
  image: Image;
}
