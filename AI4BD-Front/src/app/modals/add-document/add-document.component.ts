/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import {Document} from "../../models/document";
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import {SharedService} from "../../service/shared.service";

const submitDocument = gql`
  mutation addDocument($author: String!, $dateCreated: String!, $title: String!) {
    addDocument(input: {author: $author, dateCreated: $dateCreated, title: $title}) {
      document {
          _id
          title
          author
        }
       errors {
          path
          message
        }
      }
  }
`;

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.css']
})
export class AddDocumentComponent implements OnInit {
  display: boolean;
  document: Document = new Document();

  callback: (document: Document) => void;

  constructor(private apollo: Apollo,
              private sharedService: SharedService) { }

  ngOnInit(): void {
    this.display = true;
  }

  add() {
    this.document.convertDate();
     this.apollo.mutate({
        mutation: submitDocument,
        variables: {
          author: this.document.author,
          dateCreated: this.document.dateCreated,
          title: this.document.title
        }
      }).subscribe(({ data }) => {
        this.sharedService.showSuccess();
        this.display = false;
        this.callback(data['addDocument'].document);
      },(error) => {
        this.sharedService.showFailure();
        console.log('there was an error sending the query', error);
      });
  }

  onAdd(callback: (document: Document) => void) {
    this.callback = callback;
  }
}
