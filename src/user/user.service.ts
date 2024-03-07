import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  create(createUserDto: CreateUserDto) {
    return this.databaseService.createUser(createUserDto);
  }

  findAll() {
    return this.databaseService.findUserMany();
  }

  findOne(id: string) {
    return this.databaseService.findUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.databaseService.updateUser(id, updateUserDto);
  }

  remove(id: string) {
    return this.databaseService.deleteUser(id);
  }
}
