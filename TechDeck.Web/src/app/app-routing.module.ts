import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogInComponent } from './log-in/log-in.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ViewPostComponent } from './view-post/view-post.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, title: "Home - TechDeck" },
  { path: 'log-in', component: LogInComponent, title: "Log In - TechDeck" },
  { path: 'sign-up', component: SignUpComponent, title: "Sign Up - TechDeck" },
  { path: 'view-post/:id', component: ViewPostComponent, title: "Post View - TechDeck"},
  { path: 'profile/:id', component: ProfileComponent, title: "Profile - TechDeck" },
  { path: 'my-profile', component: ProfileComponent, title: "My Profile - TechDeck" },

  { path: '', redirectTo: '/sign-up', pathMatch: 'full'},

  { path: '**', redirectTo: '/log-in', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
