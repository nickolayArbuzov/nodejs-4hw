import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import {UserService} from "./user.service";
import { CreateUserDto } from './dto/create-user.dto';


@Controller('users')
export class UserController {

    constructor(private userService: UserService) {}

    @Get()
    getAll() {
        return this.userService.findAll()
    }

    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string){
        return this.userService.deleteUser(id)
    }

}