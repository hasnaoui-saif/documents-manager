/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PageComponent} from "./page/page.component";
import {DocumentContainerComponent} from "./document-container/document-container.component";

const routes: Routes = [
  { path: '', redirectTo: ':id', pathMatch: 'full'},
  {path: ':id', component: DocumentContainerComponent,
    children: [
      { path: ':id', pathMatch: 'full', component: PageComponent}
    ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SingleDocumentRoutingModule { }
