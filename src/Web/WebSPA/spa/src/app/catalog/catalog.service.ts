import { Injectable } from "@angular/core";
import { Response } from "@angular/http";

import { DataService } from "../shared/services/data.service";
import { ConfigurationService } from "../shared/services/configuration.service";
import { ICatalog } from "../shared/models/catalog.model";
import { ICatalogBrand } from "../shared/models/catalog-brand.model";
import { ICatalogType } from "../shared/models/catalog-type.model";

import "rxjs/Rx";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import "rxjs/add/observable/throw";
import "rxjs/add/operator/map";

@Injectable()
export class CatalogService {
    private catalogUrl = "";
    private brandUrl = "";
    private typesUrl = "";

    constructor(private dataService: DataService, private configurationService: ConfigurationService) {
        this.configurationService.settingsLoaded$.subscribe(x => {
            this.catalogUrl = `${this.configurationService.serverSettings.catalogUrl}/api/v1/catalog/items`;
            this.brandUrl = `${this.configurationService.serverSettings.catalogUrl}/api/v1/catalog/catalogbrands`;
            this.typesUrl = `${this.configurationService.serverSettings.catalogUrl}/api/v1/catalog/catalogtypes`;
        });
    }

    getCatalog(pageIndex: number, pageSize: number, brand: number, type: number): Observable<ICatalog> {
        let url = this.catalogUrl;
        if (brand || type) {
            url = this.catalogUrl + '/type/' + ((type) ? type.toString() : 'null') + '/brand/' + ((brand) ? brand.toString() : 'null');
        }

        url = `${url}?pageIndex=${pageIndex}&pageSize=${pageSize}`;

        return this.dataService.get(url)
            .map(response => response.json());
    }

    getBrands(): Observable<ICatalogBrand[]> {
        return this.dataService.get(this.brandUrl)
            .map(response => response.json());
    }

    getTypes(): Observable<ICatalogType[]> {
        return this.dataService.get(this.typesUrl)
            .map(response => response.json());
    }
}