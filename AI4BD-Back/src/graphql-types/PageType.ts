/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { ObjectType, Field, InputType } from "type-graphql";
import { FieldError } from "./FieldError";

import { PageType } from "./DocumentType";

@ObjectType()
export class PagesResponseType {
  @Field(() => [PageType], { nullable: true })
  Pages?: PageType[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class PageResponseType {
  @Field(() => PageType, { nullable: true })
  page: any;

  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@InputType()
export class PageInputType {
  @Field()
  text: string;

  @Field()
  pageNr: number;

  @Field()
  documentId: string;
}

@InputType()
export class PageIdInputType {
  @Field()
  pageId: string;
}
