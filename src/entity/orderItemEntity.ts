import { JoinColumn } from 'typeorm';
import { Order } from './orderEntity';
import { Column, CreateDateColumn, Entity, Generated, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'order_items'})
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column({
        unique: true
    })
    @Generated("uuid") 
    uuid: string; 

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToOne(()=> Order)
    @JoinColumn({name: 'order_id'})
    order: Order;

}