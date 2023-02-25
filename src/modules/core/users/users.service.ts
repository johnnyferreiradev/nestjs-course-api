import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const registredUser = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: data.email,
        },
      },
    });

    if (registredUser) {
      throw new BadRequestException(
        'There is already a registered user with this email',
      );
    }

    const createdUser = await this.prisma.user.create({
      data,
    });

    return {
      ...createdUser,
      password: undefined,
    };
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
