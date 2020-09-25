/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {SharedService} from "../service/shared.service";
import {Document} from "../models/document";
import {ConfirmationService, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {AddDocumentComponent} from "../modals/add-document/add-document.component";
import {Apollo} from "apollo-angular";
import gql from 'graphql-tag';
import { Subscription } from 'rxjs';



const AllDocuments = gql`
  query AllDocuments {
    getAllDocuments {documents{_id,title,author, pages {_id,pageNr,text}}}
  }
`;

const deleteDocument = gql`
  mutation DeleteSingleDoc($docId: String!) {
    DeleteSingleDoc(input: {docId: $docId}) {
      document {_id}
    }
  }
`;

@Component({
  selector: 'app-home',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
  providers: [MessageService,ConfirmationService]

})
export class DocumentListComponent implements OnInit {
  @ViewChild('displayAddDocument', {read: ViewContainerRef}) dialogContainer: ViewContainerRef;

  documents: Document[] = [];
  numberOfDocuments: number = 0;
  undefinedTitle = 'Undefined';
  private querySubscription: Subscription;

  constructor(private sharedService: SharedService,
              private confirmationService: ConfirmationService,
              private messageService: MessageService,
              private router: Router,
              private cfr: ComponentFactoryResolver,
              private apollo: Apollo) { }

  ngOnInit(): void {
    this.initDocuments();
  }

  private initDocuments() {
    this.querySubscription = this.apollo.watchQuery<any>({query: AllDocuments}).valueChanges.subscribe(({data}) => {
        this.documents = data.getAllDocuments.documents;
        this.numberOfDocuments = this.documents.length;
      });
  }

  view(document) {
    this.router.navigate( [document._id]).then();
  }

  delete(document: Document) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + document.title +' ?',
      header: 'Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteDocument(document._id);
      }
    });
  }

  addDocument() {
    const addDialogFactory = this.cfr.resolveComponentFactory(AddDocumentComponent);
    const addDialogComponentRef = this.dialogContainer.createComponent(addDialogFactory);
    const addDocumentComponent = addDialogComponentRef.instance;
    addDocumentComponent.onAdd((document: Document) => {
      this.documents = JSON.parse(JSON.stringify(this.documents));
      this.documents.push(document);
      this.numberOfDocuments++;
    });
  }

  private deleteDocument(id: string) {
    this.apollo.mutate({
      mutation: deleteDocument,
      variables: {
        docId: id,
      }
    }).subscribe(() => {
      this.documents = this.documents.filter(val => val._id !== id);
      this.numberOfDocuments--;
      this.sharedService.showSuccess();
    },(error) => {
      this.sharedService.showFailure();
      console.log('there was an error sending the query', error);
    });
  }

  isNull(object: any) : boolean {
    return object == null;
  }
}
