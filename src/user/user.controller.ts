import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { errorMessage } from '../lib/const/const';
import exclude from '../lib/shared/exclude';
import formatUserDate from '../lib/shared/formatUserDate';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    const updUser = formatUserDate(user);
    return exclude<User, 'password'>(updUser!, ['password']);
  }

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    const updUsers = users.map(formatUserDate);
    return updUsers.map((user) =>
      exclude<User, 'password'>(user!, ['password']),
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.findOne(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    const updUser = formatUserDate(user);
    return exclude<User, 'password'>(updUser!, ['password']);
  }

  @UsePipes(new ValidationPipe())
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { oldPassword } = updateUserDto;
    const user = await this.userService.findOne(id);
    const isSamePassword = oldPassword === user?.password;

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    if (!isSamePassword)
      throw new ForbiddenException(errorMessage.INVALID_PASSWORD);

    const updatedUser = await this.userService.update(id, updateUserDto);
    const updUser = formatUserDate(updatedUser!);
    return exclude<User, 'password'>(updUser!, ['password']);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = await this.userService.remove(id);
    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    const updUser = formatUserDate(user);
    return exclude<User, 'password'>(updUser!, ['password']);
  }
}
