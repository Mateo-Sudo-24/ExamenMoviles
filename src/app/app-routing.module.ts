import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';
import { RoleGuard } from './guards/role-guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then(m => m.SplashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'catalogo',
    loadChildren: () => import('./planes/catalogo/catalogo.module').then(m => m.CatalogoPageModule)
  },
  {
    path: 'detalle-plan/:id',
    loadChildren: () => import('./planes/detalle-plan/detalle-plan.module').then(m => m.DetallePlanPageModule)
  },
  {
    path: 'crear-editar-plan',
    loadChildren: () => import('./planes/crear-editar-plan/crear-editar-plan.module').then(m => m.CrearEditarPlanPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },
  {
    path: 'mis-contrataciones',
    loadChildren: () => import('./contrataciones/mis-contrataciones/mis-contrataciones.module').then(m => m.MisContratacionesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lista-contrataciones',
    loadChildren: () => import('./contrataciones/lista-contrataciones/lista-contrataciones.module').then(m => m.ListaContratacionesPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },

  // RUTAS DE CHAT - ORDEN IMPORTANTE
  {
    path: 'chat/general',
    loadChildren: () => import('./chat/chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AuthGuard] // opcional: si no quieres login, quita esto
  },
  {
    path: 'chat/:contratacionId',
    loadChildren: () => import('./chat/chat/chat.module').then(m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },

  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil/perfil.module').then(m => m.PerfilPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    canActivate: [AuthGuard, RoleGuard]
  },

  // No ponemos ruta comodín para evitar volver al splash accidentalmente
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}