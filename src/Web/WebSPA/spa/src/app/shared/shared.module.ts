import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { DataService } from './services/data.service';
import { BasketWrapperService } from './services/basket.wrapper.service';
import { SecurityService } from './services/security.service';
import { ConfigurationService } from './services/configuration.service';
import { StorageService } from './services/storage.service';

// Components:
import { PagerComponent } from './components/pager/pager.component';
import { HeaderComponent } from './components/header/header';
import { IdentityComponent } from './components/identity/identity';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

// Pipes:
import { UppercasePipe } from "./pipes/uppercase.pipe";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        NgbModule.forRoot(),
        HttpModule,
        JsonpModule
    ],
    declarations: [
        PagerComponent,
        HeaderComponent,
        IdentityComponent,
        PageNotFoundComponent,
        UppercasePipe
    ],
    exports: [
        PagerComponent,
        HeaderComponent,
        IdentityComponent,
        PageNotFoundComponent,
        UppercasePipe
    ],
    providers: [
        DataService,
        BasketWrapperService,
        SecurityService,
        ConfigurationService,
        StorageService
    ]
})
export class SharedModule { }