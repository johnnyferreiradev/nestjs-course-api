import { Module } from '@nestjs/common';
import { CoursesModule } from './modules/course/courses/courses.module';
import { UsersModule } from './modules/core/users/users.module';
import { AuthModule } from './modules/core/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './modules/core/auth/guards/jwt-auth.guard';

@Module({
  imports: [CoursesModule, UsersModule, AuthModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
