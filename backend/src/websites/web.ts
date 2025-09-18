import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Detail } from './details';

@Entity()
export class Web {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Detail, (detail) => detail.web)
  details: Detail[];
}
