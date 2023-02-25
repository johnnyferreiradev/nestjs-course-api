import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/course/courses/courses.module';
import { UsersModule } from './modules/core/users/users.module';

@Module({
  imports: [CoursesModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
