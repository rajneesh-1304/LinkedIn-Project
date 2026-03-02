import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('account')
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    email: string;

    @Column()
    firstName: string;

    @Column({nullable: true})
    lastName: string;

    @Column({nullable: true})
    headline: string;

    @Column({nullable: true})
    location: string;

    @Column({nullable: true})
    profilePicture: string;

    @Column({nullable: true})
    bio: string;

    @CreateDateColumn()
    createdAt: Date;
}