import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { GqlExceptionFilter, GqlArgumentsHost } from '@nestjs/graphql';
import { MongoError } from 'mongodb';
import { AuthEnum } from 'src/auth/constants/auth-constants';

@Catch(MongoError)
export class MongoDBExceptionFilter implements GqlExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);

    if (exception.code === AuthEnum.DUPLICATE_USER_CODE) {
      // Extract the duplicate field from the error message
      const errorMessage = exception.message || '';
      const match = errorMessage.match(/index: (\w+)_\d* dup key/);
      const field = match ? match[1] : 'Field';

      return new BadRequestException(
        `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`,
      );
    }

    return new BadRequestException('Database error');
  }
}
