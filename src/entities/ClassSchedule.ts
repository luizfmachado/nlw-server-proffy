import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Class from './Class';

@Entity('classSchedule')
class ClassSchedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  weekDay: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @ManyToOne(() => Class, classes => classes.schedules)
  @JoinColumn({ name: 'classId' })
  classId: Class;
}

export default ClassSchedule;
