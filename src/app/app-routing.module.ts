import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'restablecer-pass',
    loadChildren: () => import('./restablecer-pass/restablecer-pass.module').then(m => m.RestablecerPassPageModule)
  },
  {
    path: 'acerca-de',
    loadChildren: () => import('./acerca-de/acerca-de.module').then(m => m.AcercaDePageModule)
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then(m => m.InicioPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'tiempo',
    loadChildren: () => import('./tiempo/tiempo.module').then(m => m.TiempoPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  componentes = [
    {
      icon: 'home',
      name: ' Inicio',
      redirecTo: '/inicio'
    },
    {
      icon: 'person-outline',
      name: ' Perfil',
      redirecTo: '/perfil'
    },
    {
      icon: 'cloudy-night-outline',
      name: 'Tiempo',
      redirecTo: '/tiempo'
    }
    ,
    {
      icon: 'help-outline',
      name: 'Acerca De',
      redirecTo: '/acerca-de'
    },
    {
      icon:'arrow-back-outline',
      name: 'Cerrar Sesion',
      redirecTo: '/login'
    },

  ];

  tabs = [
    {
      icon: 'home',
      name: ' Inicio',
      redirecTo: '/inicio'
    },
    {
      icon: 'person-outline',
      name: ' Perfil',
      redirecTo: '/perfil'
    },
    {
      icon:'arrow-back-outline',
      name: 'Cerrar Sesion',
      redirecTo: '/login'
    },
  ]
  usuario: any = []
}
