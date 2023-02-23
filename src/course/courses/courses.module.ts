import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModel } from './courses.model';

@Module({
  imports: [TypeOrmModule.forFeature([CourseModel])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
