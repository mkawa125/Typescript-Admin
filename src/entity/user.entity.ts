import { Role } from './roleEntity';
import {Column, CreateDateColumn, DeleteDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn} from "typeorm";

@Entity()

export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column()
    password: string;

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

    @Column({
        default: null,
        nullable: true,

    })
    remember_token_expire_date: Date;

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}