import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { errorMessage } from '../lib/const/const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe())
  @Put(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const { oldPassword } = updateUserDto;
    const user = this.userService.findOne(id);
    const isSamePassword = oldPassword === user.password;

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);

    if (!isSamePassword)
      throw new ForbiddenException(errorMessage.INVALID_PASSWORD);

    const updatedUser = this.userService.update(id, updateUserDto);
    return updatedUser;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.remove(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    return user;
  }
}
