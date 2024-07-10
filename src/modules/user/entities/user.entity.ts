import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users') // 指定表名
export class User {
  @PrimaryGeneratedColumn('increment') // 指定生成类型，不需要额外的参数
  userId: number;

  @Column({ unique: true })
  email: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  ipAddress: string;

  @CreateDateColumn()
  createdAt: Date;
}
