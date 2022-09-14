import { Module, forwardRef, Global } from '@nestjs/common';
import { BlogIsExistsRule,  } from './validate.service';
import { BloggerModule } from '../blogger/blogger.module';

@Global()
@Module({
  imports: [BloggerModule],
  providers: [],
})
export class ValidateModule {}
