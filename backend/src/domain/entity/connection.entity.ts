import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('connection')
export class Connection {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    senderId: string;

    @Column()
    receiverId: string;
    
    @Column({default: 'Pending'})
    status: 'Pending' | 'Accepted' | 'Rejected';

    @CreateDateColumn()
    createdAt: Date;
}
