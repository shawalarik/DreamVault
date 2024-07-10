import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('whitelists')
export class Whitelist {
  @PrimaryGeneratedColumn('increment')
  whitelistId: number;

  @Column()
  domain: string;
}
