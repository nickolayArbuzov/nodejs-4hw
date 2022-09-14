import { Injectable, Inject, HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async createUser(dto: CreateUserDto) {
    const newUser = new User()
    newUser.login = dto.login
    newUser.password = dto.password
    newUser.email = dto.email
    let date = new Date
    newUser.createdAt = date.toISOString()
    const blogger = await this.userRepository.insert(newUser);
    return newUser
  }

  async deleteUser(id: string){
    const donorUser = await this.userRepository.findOne({where: {id: id}});
    if(donorUser) {
      await this.userRepository.delete(id)
    } else {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}