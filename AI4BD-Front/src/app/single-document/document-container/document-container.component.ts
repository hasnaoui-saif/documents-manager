/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { Component, OnInit } from '@angular/core';
import {Document} from "../../models/document";
import gql from 'graphql-tag';
import {Apollo} from "apollo-angular";
import {Subscription} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";

const SingleDoc = gql`
  query DocumentById($docId: String!) {
    getSingleDoc(input: {docId: $docId}) {
      document{_id,title,author, dateCreated, pages {_id,pageNr,text}}
    }
  }
`;

@Component({
  selector: 'app-document',
  templateUrl: './document-container.component.html',
  styleUrls: ['./document-container.component.css']
})
export class DocumentContainerComponent implements OnInit {

  docId: string;
  document: Document;

  private querySubscription: Subscription;

  constructor(private router: Router,
              private apollo: Apollo,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.docId = this.route.snapshot.params['id'];
    this.initDocument();
  }

  private initDocument() {
    this.querySubscription = this.apollo.watchQuery<any>({query: SingleDoc,
      variables: {
        docId: this.docId,
      },}).valueChanges.subscribe(({data}) => {
        console.log(data.getSingleDoc);
      this.document = data['getSingleDoc'].document;
    });
  }

}
