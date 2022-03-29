import { OrderItem } from './orderItemEntity';
import { Column, CreateDateColumn, Entity, Generated, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'orders'})
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column()
    email: string;

    @Column({
        unique: true
    })
    @Generated("uuid") 
    uuid: string; 

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp

    @OneToMany( () => OrderItem, OrderItem => OrderItem.order)
    order_items: OrderItem[];
}