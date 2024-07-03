// src/modules/infra/typeorm/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RoleTypes } from '../../domain/enums/RoleTypes.enum';
import Activity from 'src/modules/activities/typeorm/entities/Activity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: RoleTypes,
    default: RoleTypes.USER
  })
  role: RoleTypes;

  @OneToMany(() => Activity, activity => activity.user)
  activities: Activity[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
