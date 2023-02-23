import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CourseModel } from './courses.model';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CourseModel) private repository: Repository<CourseModel>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<CourseModel> {
    return await this.repository.save(createCourseDto);
  }

  async findAll(): Promise<CourseModel[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<CourseModel> {
    const course = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    return course;
  }

  async update(
    id: number,
    updateCourseDto: UpdateCourseDto,
  ): Promise<CourseModel> {
    const course = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    await this.repository.update({ id }, updateCourseDto);

    return await this.repository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<string> {
    const course = await this.repository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    await this.repository.delete(id);

    return `The course with id ${id} has been deleted`;
  }
}
