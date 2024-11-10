import { Routes } from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {SingleImageComponent} from "./components/single-image/single-image.component";
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {LoginComponent} from "./components/login/login.component";
import {AccountContentViewComponent} from "./components/account-content-view/account-content-view.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'account', component: AccountContentViewComponent},
  {path: 'image/:id', component: SingleImageComponent},
  {path: '**', redirectTo: '404'},
  {path: '404', component: NotFoundComponent}
];
