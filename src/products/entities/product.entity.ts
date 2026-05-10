import { Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity('products')
export class Product {
    @PrimaryGeneratedColumn()
    id!: number;
}
