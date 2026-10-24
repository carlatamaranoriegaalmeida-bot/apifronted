import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

interface LoginCredentials {
 email: string;
 password: string;
}

@Component({
 selector: 'app-login-dashboard',
 template: `
 <main class="login-page">
 <header class="login-heading">
   <p class="eyebrow">Portal de equipo</p>
   <h1>Bienvenida</h1>
   <p>Inicia sesión para gestionar la información de tus empleados.</p>
 </header>
 <div *ngIf="errorMessage" class="alert alert-danger login-alert" role="alert">
   {{ errorMessage }}
 </div>
 <app-login-form
 [isLoading]="loading"
 (submitLogin)="onExecuteLogin($event)">
 </app-login-form>
 </main>
 `
})
export class LoginDashboardComponent {
 loading = false;
  errorMessage: string | null = null;
 constructor(private authService: AuthService, private router: Router) {}
 onExecuteLogin(credentials: LoginCredentials): void {
 this.loading = true;
 this.errorMessage = null;
 this.authService.login(credentials).subscribe({
 next: () => {
 this.loading = false;
 // Redirección segura una vez guardado el token en localStorage
 this.router.navigate(['/employees']);
 },
 error: (err) => {
 this.loading = false;
 // Captura el mensaje formateado del validador global de errores
 this.errorMessage = err.message || 'Error de infraestructura al validar credenciales.';
 }
 });
 }
}
