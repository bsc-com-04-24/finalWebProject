import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { User } from '../../users/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'buyerId'})
  buyer!: User;

  @Column()
  buyerId!: number;

  @OneToMany(() => CartItem, item => item.cart,{ cascade:true})
  items!:CartItem[];

  @CreateDateColumn()
  createdAt!: Date;
}

