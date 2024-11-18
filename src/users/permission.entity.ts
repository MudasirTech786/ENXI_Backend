// src/permissions/permission.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from 'src/roles/role.entity'; // Path to Role entity

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Permission name (e.g., 'read', 'write', etc.)

  // Many-to-many relationship with Role
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[]; // A permission can be assigned to many roles
}
