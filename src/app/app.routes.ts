import { Routes } from '@angular/router';
import { SkillComponent } from '../app/skill/skill.component';
import { AuthGuard } from './core/services/auth.guard';
import { LayoutComponent } from './core/views/layout/layout.component';
import { LoginComponent } from './login/views/login/login.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        component: LayoutComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'skills',
                component: SkillComponent,
            },
        ],
    },
    { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
