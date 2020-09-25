/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DocumentListComponent} from "./document-list/document-list.component";
import {DocumentContainerComponent} from "./single-document/document-container/document-container.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: DocumentListComponent},
  {path: ':id', component: DocumentContainerComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
