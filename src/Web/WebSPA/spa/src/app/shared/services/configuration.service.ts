import { Injectable } from "@angular/core";
import { Http, Response, RequestOptionsArgs, RequestMethod, Headers } from "@angular/http";
import { IConfiguration } from "../models/configuration.model";
import { StorageService } from "./storage.service";

import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";

@Injectable()
export class ConfigurationService {
    serverSettings: IConfiguration;

    // Observable that is fired when settings are loaded from server
    private settingsLoadedSource = new Subject();
    settingsLoaded$ = this.settingsLoadedSource.asObservable();
    isReady: boolean = false;

    constructor(private http: Http, private storageService: StorageService) { }

    load() {
        const baseURI = document.baseURI.endsWith('/') ? document.baseURI : `${document.baseURI}/`;
        let url = `${baseURI}Home/Configuration`;

        this.http.get(url).subscribe((response: Response) => {
            console.log('server settings loaded');
            this.serverSettings = response.json();
            console.log(this.serverSettings);

            this.storageService.store('basketUrl', this.serverSettings.basketUrl);
            this.storageService.store('catalogUrl', this.serverSettings.catalogUrl);
            this.storageService.store('identityUrl', this.serverSettings.identityUrl);
            this.storageService.store('orderingUrl', this.serverSettings.orderingUrl);

            this.isReady = true;
            this.settingsLoadedSource.next();
        });
    }
}