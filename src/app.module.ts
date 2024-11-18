import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { Role } from './roles/role.entity';
import { User } from './users/user.entity';
import { Permission } from './roles/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true, // Set to false in production
      entities: [User, Role, Permission], // Register all entities here
    }),
    AuthModule,
    UsersModule,
    ItemsModule, // Ensure ItemsModule is imported
  ],
})
export class AppModule {}
