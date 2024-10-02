import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'product-list', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
