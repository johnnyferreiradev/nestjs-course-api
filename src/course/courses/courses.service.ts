import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private repository: Repository<Course>,
  ) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.repository.save(createCourseDto);
  }

  async findAll(): Promise<Course[]> {
    return await this.repository.find();
  }

  async findOne(id: number): Promise<Course> {
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
  ): Promise<Course> {
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
