import { Routes } from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {SingleImageComponent} from "./components/single-image/single-image.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {VerifyEmailComponent} from "./components/verify-email/verify-email.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'verify', component: VerifyEmailComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'image/:id', component: SingleImageComponent},
  {path: '**', redirectTo: '404'},
  {path: '404', component: NotFoundComponent}
];
