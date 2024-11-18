// src/permissions/permission.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Role } from 'src/roles/role.entity';  // Correct import path

@Entity()
export class Permission {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  // ManyToMany relationship with Role
  @ManyToMany(() => Role, (role) => role.permissions)
  roles: Role[];  // Multiple roles can have this permission
}
