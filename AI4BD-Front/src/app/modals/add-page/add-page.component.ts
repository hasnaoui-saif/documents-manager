/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import {Document} from "../../models/document";
import {Page} from "../../models/page";
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {SharedService} from "../../service/shared.service";

const submitPage = gql`
  mutation addPage($text: String!, $documentId: String!, $pageNr: Float!) {
    addPage(input: {text: $text, pageNr: $pageNr, documentId: $documentId}) {
      page  {_id,text,pageNr}
    }
  }
`;
@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

  display: boolean;
  page: Page;
  document: Document;
  callback: (page: Page) => void;

  constructor(private apollo: Apollo,
              private sharedService: SharedService) {
  }

  ngOnInit(): void {
    this.display = true;
  }

  addPage() {
    this.apollo.mutate({
      mutation: submitPage,
      variables: {
        text: this.page.text,
        pageNr: this.page.pageNr,
        documentId: this.document._id
      }
    }).subscribe(({ data }) => {
      this.sharedService.showSuccess();
      this.display = false;
      this.callback(data['addPage'].page);
    },(error) => {
      this.sharedService.showFailure();
      console.log('there was an error sending the query', error);
    });
  }

  onAdd(callback: (page: Page) => void) {
    this.callback = callback;
  }
}
