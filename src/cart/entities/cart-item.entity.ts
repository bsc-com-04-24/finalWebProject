import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Cart } from './cart.entity';
import { Product } from '../../products/entities/product.entity';
import { Service} from '../../service/entities/service.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Cart, cart => cart.items, {onDelete: 'CASCADE'})
  @JoinColumn({ name: 'cartId'})
  cart!: Cart;

  @Column()
  cartId!: number; 

  @ManyToOne(() => Product, {nullable: true, eager: true})
  @JoinColumn({ name: 'productId'})
  product!: Product;

  @Column({nullable: true})
  productId!: number;

  @ManyToOne(() => Service, {nullable: true, eager: true})
  @JoinColumn({ name: 'serviceId'})

  @Column({nullable: true})
  service!: Service;

  @Column({nullable: true})
  serviceId!: number;

  @Column({default: 1})
  quantity!: number;

}




