import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, OneToMany } from 'typeorm';
import { Permission } from 'src/roles/permission.entity'; // Path to Permission entity
import { User } from 'src/users/user.entity'; // Path to User entity

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Role name (e.g., 'admin', 'user', etc.)

  // Many-to-many relationship with Permission
  @ManyToMany(() => Permission, (permission) => permission.roles)
  permissions: Permission[]; // A role can have many permissions

  // One-to-many relationship with User
  @OneToMany(() => User, (user) => user.role) 
  users: User[]; // A role can be assigned to many users
}
