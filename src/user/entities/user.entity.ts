import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { Product } from '../../product/entities/product.entity';
import { Service } from '../../service/entities/service.entity';
import { Order } from '../../order/entities/order.entity';
import { Cart } from '../../cart/entities/cart.entity';

export enum UserRole {
  BUYER = 'buyer',
  SELLER = 'seller',
}

@Entity()
export class User {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: 'varchar2',
    enum: UserRole,
  })
  role!: UserRole;

  // @OneToMany(() => Product, (product) => product.user)
  // product!: Product[];

}
  // SELLER RELATIONS
 /* @OneToMany(() => Product, (product) => product.user)
  product!: Product[];

  @OneToMany(() => Service, (service) => service.user)
  service!: Service[];

  // BUYER RELATIONS
  @OneToMany(() => Order, (order) => order.user)
  orders!: Order[];

  @OneToOne(() => Cart, (cart) => cart.user)
  cart!: Cart;
}*/