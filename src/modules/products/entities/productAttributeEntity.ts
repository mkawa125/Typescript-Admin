import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';
import { ProductAttributeSet } from './productAttributeSetEntity';

@Entity({name: 'product_attributes'})
export class ProductAttribute {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ProductAttributeSet)
    @JoinColumn({name: 'product_attribute_set_id'})
    attribute_set: ProductAttributeSet;

    @Column()
    title: string;

    @Column({
        nullable: true,

    })

    @Column({
        default: null,
        nullable: true,

    })
    slug: string;

    @Column({
        default: null,
        nullable: true,

    })
    color: string;

    @Column({
        default: null,
        nullable: true,

    })
    image: string;

    @Column({
        default: "published",
        nullable: false,

    })
    status: string;

    @Column({
        default: false,
        nullable: false,

    })
    is_default: boolean;

    @Column({
        default: 0,
        nullable: false,

    })
    order: number;

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