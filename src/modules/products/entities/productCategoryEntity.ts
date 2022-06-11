import { Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, ManyToOne, OneToMany, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from 'typeorm';

@Entity({name: 'product_categories'})
export class ProductCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne((type) => ProductCategory, (category) => category.children)
    parent: ProductCategory

    @OneToMany((type) => ProductCategory, (category) => category.parent)
    children: ProductCategory[]

    @Column({
        type: "varchar",
        length: 400,
        default: null,
        nullable: true
    })
    description: string;

    @Column({
        default: "published",
        nullable: false,

    })
    status: string;

    @Column({
        default: false,
        nullable: false,

    })
    is_featured: boolean;

    @Column({nullable: true})
    image: string;

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