import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: 'inscription',
    loadComponent: () => import('./features/auth/signup/signup.component').then(m => m.SignupComponent),
    title: 'Créer un compte - PK-Chat'
  },
  {
    path: 'connexion',
    loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent),
    title: 'Connexion - PK-Chat'
  },
  // Also support English routes
  {
    path: 'signup',
    redirectTo: 'inscription'
  },
  {
    path: 'login',
    redirectTo: 'connexion'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
