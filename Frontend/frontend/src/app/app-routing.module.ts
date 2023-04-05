import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeerComponent } from './components/leer/leer.component';
import { ObtenerComponent } from './components/obtener/obtener.component';

const routes: Routes = [{
  path : '',
  redirectTo: '/analizar',
  pathMatch: 'full'
},
{
  path : 'analizar',
  component: ObtenerComponent
},
{
  path : 'leer',
  component: LeerComponent
},



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }