import { Column, Entity, PrimaryGeneratedColumn, Timestamp } from 'typeorm';

@Entity({name: 'roles'})
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    // @Column()
    // created_at: Timestamp

    // @Column()
    // updated_at: Timestamp

    // @Column()
    // deleted_at: Timestamp
}