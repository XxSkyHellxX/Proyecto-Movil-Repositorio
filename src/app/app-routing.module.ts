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
  },
  {
    path: 'modificar-datos',
    loadChildren: () => import('./modificar-datos/modificar-datos.module').then( m => m.ModificarDatosPageModule)
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./ayuda/ayuda.module').then( m => m.AyudaPageModule)
  },
  {
    path: 'vehiculo',
    loadChildren: () => import('./vehiculo/vehiculo.module').then( m => m.VehiculoPageModule)
  },
  {
    path: 'buscar-vehiculo',
    loadChildren: () => import('./buscar-vehiculo/buscar-vehiculo.module').then( m => m.BuscarVehiculoPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./mapa/mapa.module').then( m => m.MapaPageModule)
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
      icon: 'accessibility-outline',
      name: 'Acerca De',
      redirecTo: '/acerca-de'
    }
    ,
    {
      icon: 'help-outline',
      name: 'Ayuda',
      redirecTo: '/ayuda'
    },
  ];



  usuario: any = []
  usuarioFireBase:any[]=[];
  usuarioVehiculo:any[]=[];
  vehiculos:any[]=[];
  uid:any;
  destinoConductor:any;

  lat:number=0
  lng:number=0

}
