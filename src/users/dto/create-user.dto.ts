export class CreateUserDto {
  username: string;
  password: string;
  roleName: string; // Role to assign (e.g., 'admin', 'user')
}
