import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Album } from '../../album/entities/album.entity';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn('increment')
  imageId: number;

  @Column()
  url: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  size: number;

  @Column()
  isSafe: boolean;

  @ManyToOne(() => Album)
  album: Album;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  uploadedAt: Date;
}
