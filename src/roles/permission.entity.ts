// src/roles/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from './role.entity'; // Ensure correct import path

@Entity('permission') // Specify the table name for permissions
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // The name of the permission (e.g., 'create', 'edit', etc.)

  @ManyToMany(() => Role, (role) => role.permissions) // Many permissions can belong to many roles
  roles: Role[];
}
