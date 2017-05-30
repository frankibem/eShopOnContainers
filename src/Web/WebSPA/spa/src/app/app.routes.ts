import { Routes, RouterModule } from "@angular/router";

// Main components
import { CatalogComponent } from "./catalog/catalog.component";

export const routes: Routes = [
    { path: "", redirectTo: 'catalog', pathMatch: 'full' },
    { path: "catalog", component: CatalogComponent }
];

export const routing = RouterModule.forRoot(routes);