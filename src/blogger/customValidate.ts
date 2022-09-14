import { Global, Inject, Injectable } from '@nestjs/common';
import { Blogger } from './blogger.entity';
import { Repository } from 'typeorm';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { BloggerService } from './blogger.service';

export function BlogIsExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BlogIsExistRule,
    });
  };
}

@ValidatorConstraint({ name: 'BlogIsExist', async: false })
@Injectable()
export class BlogIsExistRule implements ValidatorConstraintInterface {
  constructor(private blogService: BloggerService) {}

  async validate(value: string, context: any) {
    try {
      const blog = await this.blogService.findOneForCustomDecorator(value)
      if(blog) {
        return true
      } else return false
      //const blog = await this.blogRepository.find({where: {id: value}});
    } catch (e) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return `User doesn't exist`;
  }
}


function Component() {
  throw new Error('Function not implemented.');
}

