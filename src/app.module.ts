import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { AuthModule } from './auth/auth.module';
import { ItemsModule } from './items/items.module';
import { Role } from './roles/role.entity';
import { User } from './users/user.entity';
import { Permission } from './roles/permission.entity';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Role, Permission],
    }),
    AuthModule,
    UsersModule,
    ItemsModule,
  ],
  controllers: [AppController],  // Add AppController here
  providers: [AppService],      // Add AppService here
})
export class AppModule {}
