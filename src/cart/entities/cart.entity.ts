
import {Entity, PrimaryGeneratedColumn, OneToOne,OneToMany,  JoinColumn,} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id!: number;

  // ONE USER -> ONE CART
  @OneToOne(() => User, (user) => user.cart, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user!: User;

  // ONE CART -> MANY ITEMS
  @OneToMany(() => CartItem, (item) => item.cart, {
    cascade: true,
  })
  items: CartItem[];
}