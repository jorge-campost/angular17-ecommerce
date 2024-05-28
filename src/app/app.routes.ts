import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'products',
        loadComponent: () => import('./features/products/products.component').then(c => c.ProductsComponent)
    },
    {
        path: 'products-details/:id',
        loadComponent: () => import('./features/products/details/details.component').then(c => c.DetailsComponent)
    },
    {
        path: 'checkout',
        loadComponent: () => import('./features/checkout/checkout.component').then(c => c.CheckoutComponent)
    },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', redirectTo: 'products', pathMatch: 'full' },
];
