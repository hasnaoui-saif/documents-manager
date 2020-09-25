/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {Page} from "./page";
import {DatePipe} from "@angular/common";

export class Document {
  _id: string;
  title?: string;
  author?: string;
  dateCreated?: string;
  pages?: Page[];

  convertDate() {
    if (this.dateCreated != null) {
      let datePipe = new DatePipe('en');
      this.dateCreated = (datePipe.transform(this.dateCreated, 'dd/MM/yyyy')).toString();
    }
  }

  constructor(document?: Document, page?: Page) {
    this._id = document._id;
    this.title = document.title;
    this.author = document.author;
    this.dateCreated = document.dateCreated;
    this.pages = JSON.parse(JSON.stringify(document.pages));
    this.pages.push(page);
  }
}
