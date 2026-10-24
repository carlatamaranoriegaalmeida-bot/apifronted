import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { LoginDashboardComponent } from './features/auth/login-dashboard.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: LoginDashboardComponent, pathMatch: 'full' },
  { path: 'employees.', redirectTo: 'employees', pathMatch: 'full' },
  { path: 'employees', component: EmpleadoComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
