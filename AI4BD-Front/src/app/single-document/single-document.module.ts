/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SingleDocumentRoutingModule } from './single-document-routing.module';
import {DocumentInformationComponent} from "./document-information/document-information.component";
import {PageComponent} from "./page/page.component";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    PageComponent,
    DocumentInformationComponent
  ],
  exports: [
    DocumentInformationComponent
  ],
  imports: [
    CommonModule,
    SingleDocumentRoutingModule,
    ButtonModule,
    RippleModule,
    ToastModule
  ], providers: [
  ]
})
export class SingleDocumentModule { }
