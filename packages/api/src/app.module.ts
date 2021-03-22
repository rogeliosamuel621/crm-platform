import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { AuthenticationModule } from './authentication/authentication.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/crm_platform'),
    UserModule,
    AuthenticationModule,
  ],
})
export class AppModule {}
