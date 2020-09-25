/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class FieldError {
  @Field()
  path: string;

  @Field()
  message: string;
}
