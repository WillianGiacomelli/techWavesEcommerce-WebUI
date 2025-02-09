import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule)
  },
];

export const ModulesRoutes = RouterModule.forChild(routes);
