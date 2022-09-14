import { Global, Inject, Injectable } from '@nestjs/common';
import { Blogger } from '../blogger/blogger.entity';
import { Repository } from 'typeorm';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

export function BlogIsExist(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: BlogIsExistsRule,
    });
  };
}


@ValidatorConstraint({ async: true })
@Injectable()
export class BlogIsExistsRule implements ValidatorConstraintInterface {
  constructor(
    @Inject('BLOGGER_REPOSITORY') 
    private readonly blogRepository: Repository<Blogger>,
  ) {}

  async validate(value: string) {
    const blog = await this.blogRepository.findOne({where: {id: value}});
    if(!blog){
       return false
    }
    return true
    // use repo
  }

  defaultMessage(args: ValidationArguments) {
    return `Blog doesn't exist`;
  }
  
}


