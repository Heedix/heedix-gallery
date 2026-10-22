import { Routes } from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {SingleImageComponent} from "./components/single-image/single-image.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";
import {adminGuard} from './guards/admin.guard';

export const routes: Routes = [
  {path: 'admin/login', loadComponent: () => import('./components/admin/admin-login.component').then(m => m.AdminLoginComponent)},
  {path: 'admin', canActivate: [adminGuard], loadComponent: () => import('./components/admin/admin.component').then(m => m.AdminComponent)},
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerifyEmailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'image/:id', component: SingleImageComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];
