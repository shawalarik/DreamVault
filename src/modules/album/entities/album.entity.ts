import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('increment')
  albumId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: false })
  isDefault: boolean;

  @ManyToOne(() => User)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
