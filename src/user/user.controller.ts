import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { errorMessage } from '../lib/const/const';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.findOne(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    return user;
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = this.userService.update(id, updateUserDto);

    if (!updatedUser) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    return updatedUser;
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    const user = this.userService.remove(id);

    if (!user) throw new NotFoundException(errorMessage.USER_NOT_FOUND);
    return user;
  }
}
