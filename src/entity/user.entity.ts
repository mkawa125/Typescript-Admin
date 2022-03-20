import { Role } from './roleEntity';
import {Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn} from "typeorm";

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


    @ManyToMany(() => Role)
    @JoinColumn({name: 'role_id'})
    role: Role;
}