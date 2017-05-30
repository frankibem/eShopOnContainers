import { NgModule } from '@angular/core';
import { BrowserModule } from "@angular/platform-browser";

import { SharedModule } from "../shared/shared.module";
import { CatalogComponent } from "./catalog.component";
import { PagerComponent } from "../shared/components/pager/pager.component";

@NgModule({
  imports: [
    BrowserModule,
    SharedModule
  ],
  declarations: [CatalogComponent]
})
export class CatalogModule { }
