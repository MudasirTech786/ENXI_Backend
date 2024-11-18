import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from 'src/roles/role.entity'; // Path to Role entity

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  // Many-to-one relationship with Role
  @ManyToOne(() => Role, (role) => role.users)
  role: Role; // Each user has one role
}
