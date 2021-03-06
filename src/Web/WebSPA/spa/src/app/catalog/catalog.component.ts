import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { CatalogService } from './catalog.service';
import { ConfigurationService } from '../shared/services/configuration.service';
import { ICatalog } from '../shared/models/catalog.model';
import { ICatalogItem } from '../shared/models/catalog-item.model';
import { ICatalogType } from '../shared/models/catalog-type.model';
import { ICatalogBrand } from '../shared/models/catalog-brand.model';
import { IPager } from '../shared/models/pager.model';
import { BasketWrapperService } from '../shared/services/basket.wrapper.service';
import { SecurityService } from '../shared/services/security.service';

@Component({
  selector: 'esh-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  brands: ICatalogBrand[];
  types: ICatalogType[];
  catalog: ICatalog;
  brandSelected: number;
  typeSelected: number;
  paginationInfo: IPager;
  authenticated = false;
  authSubscription: Subscription;

  constructor(private catalogService: CatalogService, private basketService: BasketWrapperService,
    private configurationService: ConfigurationService, private securityService: SecurityService) {
    this.authenticated = securityService.IsAuthorized;
  }

  ngOnInit() {
    // Load data using loaded configuration
    if (this.configurationService.isReady) {
      this.loadData();
    } else {
      this.configurationService.settingsLoaded$.subscribe(x => {
        this.loadData();
      });
    }

    // Subscribe to login and logout observable
    this.authSubscription = this.securityService.authenticationChallenge$.subscribe(res => {
      this.authenticated = res;
    });
  }

  loadData() {
    this.getBrands();
    this.getCatalog(10, 0);
    this.getTypes();
  }

  onFilterApplied(event: any) {
    event.preventDefault();
    this.getCatalog(this.paginationInfo.itemsPage, this.paginationInfo.actualPage, this.brandSelected, this.typeSelected);
  }

  onBrandFilterChanged(event: any, value: number) {
    event.preventDefault();
    this.brandSelected = value;
  }

  onTypeFilterChanged(event: any, value: number) {
    event.preventDefault();
    this.typeSelected = value;
  }

  onPageChanged(value: any) {
    console.log('catalog pager event fired' + value);
    event.preventDefault();

    this.paginationInfo.actualPage = value;
    this.getCatalog(this.paginationInfo.itemsPage, value);
  }

  addToCart(item: ICatalogItem) {
    this.basketService.addItemToBasket(item);
  }

  getCatalog(pageSize: number, pageIndex: number, brand?: number, type?: number) {
    this.catalogService.getCatalog(pageIndex, pageSize, brand, type).subscribe(catalog => {
      this.catalog = catalog;
      this.paginationInfo = {
        actualPage: catalog.pageIndex,
        itemsPage: catalog.pageSize,
        totalItems: catalog.count,
        totalPages: Math.ceil(catalog.count / catalog.pageSize),
        items: catalog.pageSize
      };
    });
  }

  getTypes() {
    this.catalogService.getTypes().subscribe(types => {
      this.types = types;
      let allTypes = { id: null, type: 'All' };
      this.types.unshift(allTypes);
    });
  }

  getBrands() {
    this.catalogService.getBrands().subscribe(brands => {
      this.brands = brands;
      let allBrands = { id: null, brand: 'All' };
      this.brands.unshift(allBrands);
    });
  }
}
