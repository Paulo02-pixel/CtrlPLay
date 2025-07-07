import { CtrlplayModule } from './pages/modules/ctrlplay.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {path: '', redirectTo: 'ctrlplay', pathMatch: 'full'},  // Redirigir por defecto a 'technology'

  {
    path: 'ctrlplay',   // Ruta base para el portafolio
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/modules/ctrlplay.module').then(m => m.CtrlplayModule)}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
