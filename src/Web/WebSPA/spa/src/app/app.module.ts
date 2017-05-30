import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { routing } from "./app.routes";
import { AppService } from "./app.service";
import { AppComponent } from './app.component';
import { SharedModule } from "./shared/shared.module";
import { CatalogModule } from "./catalog/catalog.module";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    SharedModule,
    CatalogModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule { }
