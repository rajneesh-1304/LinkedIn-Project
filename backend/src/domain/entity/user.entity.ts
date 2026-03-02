import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  displayName: string;

  @Column({ unique: true })
  email: string;

  // @Column()
  // role: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({default:false})
  isBanned: boolean;

  @ManyToMany(() => User, user => user.connections)
  @JoinTable()
  connections: User[];

  @ManyToMany(() => User, user => user.followers)
  @JoinTable()
  followers: User[];
}