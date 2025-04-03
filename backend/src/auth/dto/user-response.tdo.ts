import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserReponseDto {
  @Field(() => String)
  accessToken: string;
  @Field(() => String)
  refreshToken: string;
  @Field(() => String)
  message: string;
}
