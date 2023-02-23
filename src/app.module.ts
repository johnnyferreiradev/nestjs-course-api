import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './course/courses/courses.module';
import { ormConfig } from 'orm.config';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), CoursesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
