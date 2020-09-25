/*
 * Copyright (c) 2020. Saif Edine Hasnaoui.
 * All rights reserved.
 */

import {Component, OnChanges, OnInit} from '@angular/core';
import {Apollo} from "apollo-angular";
import {ActivatedRoute, Router} from "@angular/router";
import gql from 'graphql-tag';
import {Page} from "../../models/page";

const getPage = gql`
    mutation getSinglePage($pageId: String!) {
      getSinglePage(input: {pageId: $pageId}) {
        page  {text,pageNr}
      }
    }
`;

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pageId: string;
  page: Page = new Page();

  constructor(private apollo: Apollo,
              private route: ActivatedRoute,
              private router: Router) {
    router.events.subscribe((val) => {
      // see also
this.ngOnInit();    });
  }

  ngOnInit(): void {
    this.pageId = this.route.snapshot.params['id'];
    this.getPage();
  }

  private getPage() {
    this.apollo.mutate({
      mutation: getPage,
      variables: {
        pageId: this.pageId
      }
    }).subscribe(({ data }) => {
      this.page = data['getSinglePage'].page;
    },(error) => {
      console.log('there was an error sending the query', error);
    });
  }
}
