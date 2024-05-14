import { Routes } from '@angular/router';
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";
import {SingleImageComponent} from "./components/single-image/single-image.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'image/:id', component: SingleImageComponent} //TODO Page not found with ** path
];
