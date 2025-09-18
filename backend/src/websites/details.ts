import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Web } from './web';

@Entity()
export class Detail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tukhoa: string;

  @Column()
  trang: string;

  @Column({ type: 'int' })
  vitri: number;

  @Column({ type: 'boolean', default: false })
  isClick: boolean;

  // Bỏ default CURRENT_TIMESTAMP, vì client sẽ truyền
  @Column({ type: 'timestamp' })
  timestamp: Date;

  @ManyToOne(() => Web, (web) => web.details, { onDelete: 'CASCADE' })
  web: Web;
}
