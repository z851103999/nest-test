import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './logical/user/user.controller'
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController,UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
