/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DocumentListComponent } from './document-list/document-list.component';
import { DocumentContainerComponent } from './single-document/document-container/document-container.component';
import { AddDocumentComponent } from './modals/add-document/add-document.component';
import { AddPageComponent } from './modals/add-page/add-page.component';
import {TableModule} from "primeng/table";
import { HttpClientModule } from '@angular/common/http';
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {RippleModule} from "primeng/ripple";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";
import { SingleDocumentModule } from './single-document/single-document.module';
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {CalendarModule} from "primeng/calendar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {InputTextareaModule} from "primeng/inputtextarea";
import { GraphQLModule } from './graphql.module';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";

@NgModule({
  declarations: [
    AppComponent,
    DocumentListComponent,
    DocumentContainerComponent,
    AddDocumentComponent,
    AddPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    RippleModule,
    ToolbarModule,
    CardModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    InputTextareaModule,
    GraphQLModule,
    SingleDocumentModule,
    ConfirmDialogModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

