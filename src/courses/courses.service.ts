import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Fundamentos do NestJS',
      description: 'Descrição do curso aqui',
      tags: ['NodeJS', 'NestJs'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: string) {
    const course = this.courses.find((course) => course.id === Number(id));
    if (!course) {
      throw new HttpException(
        `Course id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
    return course;
  }

  create(createCourseDto: any) {
    this.courses.push(createCourseDto);
    return createCourseDto;
  }

  update(id: string, updateCourseDto: any) {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (courseIndex === -1) {
      throw new HttpException(
        `Course id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.courses[courseIndex] = updateCourseDto;
  }

  remove(id: string) {
    const courseIndex = this.courses.findIndex(
      (course) => course.id === Number(id),
    );

    if (courseIndex === -1) {
      throw new HttpException(
        `Course id ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    }

    this.courses.splice(courseIndex, 1);
  }
}
