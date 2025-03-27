import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity('mensajes')
export class Chat{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    room: string;

    @Column()
    author: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;
}