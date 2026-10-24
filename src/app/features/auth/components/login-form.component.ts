import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
 selector: 'app-login-form',
 templateUrl: './login-form/login-form.component.html'
})
export class LoginFormComponent {
 @Input() isLoading = false;
 @Output() submitLogin = new EventEmitter<{ email: string; password: string }>();
 // Estado temporal puramente local y aislado de la vista
 formModel = { email: '', password: '' };
 onSubmit(): void {
 if (this.formModel.email && this.formModel.password) {
 // Notifica al padre el intento de inicio de sesión
 this.submitLogin.emit({ ...this.formModel });
 }
 }
}
