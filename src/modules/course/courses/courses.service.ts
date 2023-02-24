import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { createPaginator, PaginatedResult } from 'src/helpers/pagination';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto): Promise<Course> {
    return await this.prisma.course.create({
      data: createCourseDto,
    });
  }

  async findAll(query: {
    search: string;
    page: string;
  }): Promise<PaginatedResult<Course>> {
    const { search, page = 1 } = query;
    const paginate = createPaginator({ take: 5, page });
    return await paginate(this.prisma.course, {
      where: {
        name: {
          contains: search,
        },
      },
    });
  }

  async findOne(id: number): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    return course;
  }

  async update(id: number, updateCourseDto: UpdateCourseDto): Promise<Course> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    await this.prisma.course.update({
      where: {
        id,
      },
      data: updateCourseDto,
    });

    return await this.prisma.course.findUnique({
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<string> {
    const course = await this.prisma.course.findUnique({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`No courses found with id ${id}`);
    }

    await this.prisma.course.delete({
      where: {
        id,
      },
    });

    return `The course with id ${id} has been deleted`;
  }
}
