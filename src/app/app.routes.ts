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
  {
    path: 'tableau-de-bord',
    loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent),
    title: 'Tableau de bord - PK-Chat'
  },
  {
    path: 'discussion/:userId',
    loadComponent: () => import('./features/chat/private-chat/private-chat.component').then(m => m.PrivateChatComponent),
    title: 'Discussion - PK-Chat'
  },
  {
    path: 'amis',
    loadComponent: () => import('./features/friends/friends-page/friends-page.component').then(m => m.FriendsPageComponent),
    title: 'Amis - PK-Chat'
  },
  {
    path: 'configuration-profil',
    loadComponent: () => import('./features/profile/profile-setup/profile-setup.component').then(m => m.ProfileSetupComponent),
    title: 'Configuration du profil - PK-Chat'
  },
  {
    path: 'profil',
    loadComponent: () => import('./features/profile/my-profile/my-profile.component').then(m => m.MyProfileComponent),
    title: 'Mon Profil - PK-Chat'
  },
  // Also support English routes
  {
    path: 'profile',
    redirectTo: 'profil'
  },
  {
    path: 'profile-setup',
    redirectTo: 'configuration-profil'
  },
  {
    path: 'signup',
    redirectTo: 'inscription'
  },
  {
    path: 'login',
    redirectTo: 'connexion'
  },
  {
    path: 'dashboard',
    redirectTo: 'tableau-de-bord'
  },
  {
    path: 'chat/:userId',
    redirectTo: 'discussion/:userId'
  },
  {
    path: 'friends',
    redirectTo: 'amis'
  },
  {
    path: '**',
    redirectTo: ''
  }
];
