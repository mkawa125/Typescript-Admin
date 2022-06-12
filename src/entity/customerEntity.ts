import {Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from "typeorm";

@Entity({name: 'customers'})

export class Customer{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

    @Column()
    avatar: string;

    @Column({
        default: null,
        nullable: true,
        type: 'datetime'

    })
    dob: Date;

    @Column({
        default: null,
        nullable: true,

    })
    phone: string;

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

    @Column({
        default: null,
        nullable: true,

    })
    remember_token: string;

    @Column()
    email_verified_at: string;

    @Column({
        default: null,
        nullable: true,

    })
    email_verfy_token: string;

    @Column({
        default: null,
        nullable: true,

    })
    remember_token_expire_date: Date;
}