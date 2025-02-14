import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
  {
    path: "login",
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  }
];

export const ModulesRoutes = RouterModule.forChild(routes);
