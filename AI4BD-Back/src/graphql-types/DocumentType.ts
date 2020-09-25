/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { ObjectType, Field, InputType } from "type-graphql";
import { FieldError } from "./FieldError";

@ObjectType()
export class DocumentType {
  @Field()
  _id: String;

  @Field({ nullable: true })
  title: String;

  @Field({ nullable: true })
  author: String;

  @Field({ nullable: true })
  dateCreated: String;

  @Field(() => [PageType], { nullable: true })
  pages?: PageType[];
}

@ObjectType()
@InputType("page")
export class PageType {
  @Field()
  _id: String;

  @Field({ nullable: true })
  pageNr: number;

  @Field({ nullable: true })
  text: string;

  @Field({ nullable: true })
  document?: string;
}
@ObjectType()
export class DocumentsResponseType {
  @Field(() => [DocumentType], { nullable: true })
  documents?: DocumentType[];

  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];
}

@ObjectType()
export class DocumentResponseType {
  @Field(() => DocumentType, { nullable: true })
  document: DocumentType;

  @Field(() => FieldError, { nullable: true })
  errors?: FieldError;
}

@InputType()
export class DocumentInputType {
  @Field()
  title: string;

  @Field()
  author: string;

  @Field()
  dateCreated: string;
}

@InputType()
export class DocIdInputType {
  @Field()
  docId: string;
}
