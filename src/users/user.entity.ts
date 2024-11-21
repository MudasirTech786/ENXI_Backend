// src/users/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Role } from 'src/roles/role.entity';

@Entity('user') // Specify the correct table name if needed
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @ManyToOne(() => Role, (role) => role.users) // Many users can share the same role
  role: Role;
}
