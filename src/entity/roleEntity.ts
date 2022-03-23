import { Permission } from './permissionEntity';
import { Column, CreateDateColumn, ManyToMany, Entity, Generated, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn, JoinTable } from 'typeorm';


@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        unique: true
    })
    @Generated("uuid") 
    uuid: string; 

    @CreateDateColumn()
    created_at: Timestamp;

    @UpdateDateColumn()
    updated_at: Timestamp

    @ManyToMany( () => Permission )
    @JoinTable({
        name: "role_permissions",
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'}
    })
    permission: Permission;

}