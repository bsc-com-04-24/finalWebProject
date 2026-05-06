import { Entity, PrimaryGeneratedColumn, Column,} from 'typeorm';

@Entity()
export class Cart {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    productId!: number;

    @Column()
    itemCount!: number;

    @Column({type:'number',precision: 10,scale: 2})
    totalPrice!: number;


}

