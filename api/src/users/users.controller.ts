import { Controller, Get, Post, Body, Put, Param, Delete, NotFoundException, } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './user.entity';
import { UserDto } from '../dto/user.dto';


@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  //get all users
  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  //get user by id
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    } else {
      return user;
    }
  }

  //create user
  @Post()
  async create(@Body() user: UserDto) {
    return await this.userService.create(user);
  }

  //update user

  @Put(':id')
  async update(@Param('id') id: number, @Body() userDto: UserDto): Promise<any> {
    return this.userService.update(id, userDto);
  }

  //delete user
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException('User does not exist!');
    }
    return this.userService.delete(id);
  }
}