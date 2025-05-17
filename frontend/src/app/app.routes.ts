import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'EventBooking',
    loadComponent: () => import('./layouts/home/home.component').then((h) => h.HomeComponent),
  },
  {
    path: 'events',
    title: 'EventBooking - events',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/events/events.component').then((e) => e.EventsComponent),
  },
  {
    path: 'events/:id',
    title: 'EventBooking - event',
    canActivate: [authGuard],
    loadComponent: () => import('./layouts/event/event.component').then((e) => e.EventComponent),
  },
  {
    path: 'myevents',
    title: 'EventBooking - myEvents',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./layouts/my-events/my-events.component').then((m) => m.MyEventsComponent),
  },
  {
    path: 'auth',
    loadChildren: () => [
      {
        path: 'login',
        title: 'EventBooking - login',
        loadComponent: () =>
          import('./layouts/login/login.component').then((l) => l.LoginComponent),
      },
      {
        path: 'register',
        title: 'EventBooking - register',
        loadComponent: () =>
          import('./layouts/register/register.component').then((r) => r.RegisterComponent),
      },
    ],
  },
  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () => [
      {
        path: 'dashboard',
        title: 'EventBooking - dashboard',
        loadComponent: () =>
          import('./layouts/admin/admin.component').then((a) => a.AdminComponent),
      },
    ],
  },
  {
    path: '**',
    title: 'EventBooking - 404',
    loadComponent: () =>
      import('./shared/components/not-found/not-found.component').then((n) => n.NotFoundComponent),
  },
];
