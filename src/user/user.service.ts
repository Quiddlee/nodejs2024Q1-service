import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import userDB from '../db/userDB';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    return userDB.create(createUserDto);
  }

  findAll() {
    return userDB.findMany();
  }

  findOne(id: string) {
    return userDB.findById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return userDB.update(id, updateUserDto);
  }

  remove(id: string) {
    return userDB.delete(id);
  }
}
