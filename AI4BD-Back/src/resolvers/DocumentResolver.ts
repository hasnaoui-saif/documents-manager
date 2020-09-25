/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {
  DocumentInputType,
  DocumentResponseType,
  DocumentsResponseType,
  DocIdInputType,
  PageType,
} from "../graphql-types/DocumentType";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import Document from "../entity/Document";

@Resolver()
export class DocmentResolver {
  /**
   * Queries
   */

  @Query(() => DocumentsResponseType)
  async getAllDocuments() {
    try {
      const documents = await Document.find({}).populate("pages");

      return { documents };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query(() => [PageType])
  async getPagesByDocumentId(@Arg("input") { docId }: DocIdInputType) {
    try {
      const document = await Document.findById(docId);
      return document?.pages;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Query(() => DocumentResponseType)
  async getSingleDoc(@Arg("input") { docId }: DocIdInputType) {
    try {
      const document = await Document.findById(docId).populate("pages");
      console.log(document);
      return { document };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  /**
   * Mutations
   */

  @Mutation(() => DocumentResponseType)
  async addDocument(
    @Arg("input") { author, dateCreated, title }: DocumentInputType
  ) {
    try {
      const newDocument = new Document();
      newDocument.author = author;
      newDocument.title = title;
      newDocument.dateCreated = dateCreated;

      const response = await Document.create(newDocument);

      return { document: response };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  @Mutation(() => DocumentResponseType)
  async DeleteSingleDoc(@Arg("input") { docId }: DocIdInputType) {
    try {
      const document = await Document.findByIdAndDelete(docId);
      return { document };
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
