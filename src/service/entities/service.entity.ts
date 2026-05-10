import { Entity,PrimaryGeneratedColumn } from "typeorm";
@Entity('services')
export class Service {
    @PrimaryGeneratedColumn()
    id!: number;
}

//TODO: add actual service fields





