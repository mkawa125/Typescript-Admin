import { Column, CreateDateColumn, Entity, Generated, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    discription: string;

    @Column()
    image: string;

    @Column()
    price: number;

    @Column({
        unique: true
    })
    @Generated("uuid") 
    uuid: string; 

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp
}