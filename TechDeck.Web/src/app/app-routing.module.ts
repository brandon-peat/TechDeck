import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - Techdeck" },
  { path: 'log-in', component: LogInComponent, title: "Log In - Techdeck" },
  { path: 'sign-up', component: SignUpComponent, title: "Sign Up - Techdeck" },

  { path: '', redirectTo: '/sign-up', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
