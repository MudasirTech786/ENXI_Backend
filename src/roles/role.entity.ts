// src/roles/role.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from 'src/users/user.entity'; // Correct import for User entity
import { Permission } from './permission.entity'; // Correct import for Permission entity

@Entity('role') // Specify the correct table name for roles
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Role name (e.g., 'admin', 'user')

  @OneToMany(() => User, (user) => user.role) // One role can have many users
  users: User[];

  @ManyToMany(() => Permission, (permission) => permission.roles) // Many roles can have many permissions
  @JoinTable() // This decorator creates the join table for the many-to-many relationship
  permissions: Permission[];
}
