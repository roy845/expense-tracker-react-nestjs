import { ArgsType, Field } from '@nestjs/graphql';
import { SortOrder } from './sort-order.enum';

@ArgsType()
export class SortArgs {
  @Field(() => String, { nullable: true })
  sortBy?: string;

  @Field(() => SortOrder, { nullable: true, defaultValue: SortOrder.ASC })
  order?: SortOrder;
}
