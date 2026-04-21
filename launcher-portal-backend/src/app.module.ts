import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppsModule } from './apps/apps.module';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('MONGO_URI is not defined');
}

@Module({
  imports: [MongooseModule.forRoot(mongoUri), AppsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
