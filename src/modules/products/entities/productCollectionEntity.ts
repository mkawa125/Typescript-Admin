import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'product_collections'})
export class ProductCollection {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    slug: string;

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
        default: false,
        nullable: false,

    })
    is_featured: boolean;

    @Column({nullable: true})
    image: string;

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