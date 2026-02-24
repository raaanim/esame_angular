import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { MenuComponent } from './features/menu/menu.component';
import { CartComponent } from './features/cart/cart.component';
import { PagenotfoundComponent } from './features/pagenotfound/pagenotfound.component';
import { SinglepizzaComponent } from './features/singlepizza/singlepizza.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'cart', component: CartComponent },
  { path: 'singlepizza/:id', component: SinglepizzaComponent },
  { path: '404', component: PagenotfoundComponent },
  { path: '**', redirectTo: '404', pathMatch: 'full' },
];
