import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {SettingsComponent} from "./components/settings/settings.component";
import {HomeComponent} from "./components/home/home.component";

export const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'settings-component', component: SettingsComponent}
];
