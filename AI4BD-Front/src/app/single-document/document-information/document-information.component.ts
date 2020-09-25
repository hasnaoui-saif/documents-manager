/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {Document} from "../../models/document";
import {AddDocumentComponent} from "../../modals/add-document/add-document.component";
import {Page} from "../../models/page";
import {AddPageComponent} from "../../modals/add-page/add-page.component";
import {SharedService} from "../../service/shared.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-document-information',
  templateUrl: './document-information.component.html',
  styleUrls: ['./document-information.component.css']
})
export class DocumentInformationComponent implements OnInit {
  @ViewChild('displayAddPAge', {read: ViewContainerRef}) dialogContainer: ViewContainerRef;

  @Input() document: Document;

  constructor(private cfr: ComponentFactoryResolver,
              private documentService: SharedService,
              private router: Router) { }

  ngOnInit(): void {
  }

  addPage() {
    const addDialogFactory = this.cfr.resolveComponentFactory(AddPageComponent);
    const addDialogComponentRef = this.dialogContainer.createComponent(addDialogFactory);
    const addPageComponent = addDialogComponentRef.instance;
    addPageComponent.document = this.document;
    addPageComponent.page = new Page();
    addPageComponent.page.pageNr = this.document.pages.length + 1;
    addPageComponent.onAdd((page: Page) => {
      this.document = new Document(this.document, page);
    });
  }

  view(page: Page) {
    this.router.navigate( [this.document._id + '/' + page._id]).then();
  }
}
