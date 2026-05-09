
import { Entity, PrimaryGeneratedColumn,Column,ManyToOne,} from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class CartItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  // MANY ITEMS -> ONE CART
  @ManyToOne(() => Cart, (cart) => cart.items, {onDelete: 'CASCADE',})
    cart!: Cart;

  // EACH ITEM REFERENCES A PRODUCT
  @ManyToOne(() => Product
  , {eager: true,})
  product!: Product;
}