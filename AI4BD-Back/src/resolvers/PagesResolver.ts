/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {
  PageIdInputType,
  PageInputType,
  PageResponseType,
  PagesResponseType,
} from "../graphql-types/PageType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Page from "../entity/Page";
import Document from "../entity/Document";
@Resolver()
export class PageResolver {
  /**
   * Queries
   */
  @Query(() => PagesResponseType)
  async getAllPages() {
    try {
      const Pages = await Page.find({});

      return { Pages };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => PageResponseType)
  async addPage(@Arg("input") { text, pageNr, documentId }: PageInputType) {
    try {
      const newPage = new Page();
      const relatedDocument = await Document.findById(documentId);
      if (relatedDocument) newPage.document = relatedDocument;
      newPage.pageNr = pageNr;
      newPage.text = text;

      const response = await Page.create(newPage);
      await relatedDocument?.pages.push(newPage);
      await relatedDocument?.save();

      return { page: response };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Mutations
   */

  @Mutation(() => PageResponseType)
  async getSinglePage(@Arg("input") { pageId }: PageIdInputType) {
    try {
      const page = await Page.findById(pageId);
      console.log(page);
      return { page };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

}
