import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './logical/user/user.controller'
import { AppService } from './app.service';
import { UserService } from './logical/user/user.service';
import { UserModule } from './logical/user/user.module';
import { AuthModule } from './logical/auth/auth.module';
import { CommodityService } from './logical/commodity/commodity.service';
import { CommodityController } from './logical/commodity/commodity.controller';

@Module({
  imports: [UserModule, AuthModule],
  controllers: [AppController,UserController, CommodityController],
  providers: [AppService, UserService, CommodityService],
})
export class AppModule {}
