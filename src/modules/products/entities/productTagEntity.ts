import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'product_tags'})
export class ProductTag {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type: "varchar",  
        length: 400,
        default: null,
        nullable: true
    })
    description: string;

    @Column()
    status: string;

    @Column({
        unique: true
    })
    @Generated("uuid") 
    uuid: string; 

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp

    @DeleteDateColumn()
    deleted_at: Timestamp

}