import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from './User';
import ClassSchedule from './ClassSchedule';

@Entity('classes')
class Class {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  subject: string;

  @Column()
  cost: number;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: User;

  @OneToMany(() => ClassSchedule, schedules => schedules.classId)
  schedules: ClassSchedule[];
}

export default Class;
