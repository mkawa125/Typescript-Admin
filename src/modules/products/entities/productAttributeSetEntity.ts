import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'product_attribute_sets'})
export class ProductAttributeSet {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({
        nullable: true,

    })
    @Column()
    slug: string;

    @Column({
        default: "swatch_dropdown",
        nullable: false,

    })
    display_layout: string;

    @Column({
        default: "published",
        nullable: false,

    })
    status: string;

    @Column({
        default: true,
        nullable: false,

    })
    is_searchable: boolean;

    @Column({
        default: true,
        nullable: false,

    })
    is_comparable: boolean;

    @Column({
        default: false,
        nullable: false,

    })
    is_use_in_product_listing: boolean;

    @Column()
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