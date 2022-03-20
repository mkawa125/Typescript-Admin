import { Role } from './roleEntity';
import {Column, Entity, Generated, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

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

    @ManyToOne(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}