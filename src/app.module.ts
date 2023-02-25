import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/course/courses/courses.module';
import { UsersModule } from './modules/core/users/users.module';
import { AuthModule } from './modules/core/auth/auth.module';

@Module({
  imports: [CoursesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
