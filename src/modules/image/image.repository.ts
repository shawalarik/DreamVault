import { EntityRepository, Repository } from 'typeorm';
import { Image } from './entities/image.entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {}
