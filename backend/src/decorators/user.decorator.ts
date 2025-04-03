import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserJWTResponse } from 'src/auth/types/jwt.types';

export const User = createParamDecorator(
  (data: keyof UserJWTResponse | undefined, ctx: ExecutionContext) => {
    const gqlContext = GqlExecutionContext.create(ctx);
    const request = gqlContext.getContext().req;

    if (!request.user) {
      throw new Error('No user found in request');
    }

    return data ? request.user[data] : request.user;
  },
);
