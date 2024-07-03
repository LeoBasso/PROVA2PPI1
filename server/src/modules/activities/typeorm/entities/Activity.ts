import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IActivity } from '../../domain/interfaces/IActivity';
import User from 'src/modules/user/typeorm/entities/User';
import { ActivityTypes } from '../../domain/enums/ActivityTypes.enum';

@Entity('activities')
class Activity implements IActivity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({
    type: 'enum',
    enum: ActivityTypes,
  })
  type: ActivityTypes;

  @Column()
  distance: number;

  @Column()
  time: number;

  @Column()
  elevation: number;

  @Column()
  avg: number;

  @Column()
  date: Date;

  @Column({ type: 'bigint' })
  user_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, user => user.activities)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

export default Activity;
