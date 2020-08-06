import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';

import User from './User';

@Entity('connections')
class Connection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  userId: string;

  @CreateDateColumn()
  createdAt: Date;
}

export default Connection;
