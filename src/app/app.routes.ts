import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard',
        loadComponent: () =>
            import('./core/views/layout/layout.component').then(
                (mod) => mod.LayoutComponent
            ),
    },
];
