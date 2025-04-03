import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshTokenResponseDto {
  @Field(() => String)
  message: string;
  @Field(() => String)
  accessToken: string;
}
