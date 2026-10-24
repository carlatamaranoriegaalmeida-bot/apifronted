import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import type { ApiResponse } from '../models/empleado';

interface AuthUser {
  email?: string;
  rol: string;
}

interface LoginResponse {
  token: string;
  user: AuthUser;
}

@Injectable({
 providedIn: 'root'
})
export class AuthService {
 private API_URL = 'http://localhost:3000/api/v1/auth';
 private TOKEN_KEY = 'access_token';
 // Flujo reactivo interno del estado de autenticación (Única fuente de verdad en UI)
 private currentUserSubject = new BehaviorSubject<AuthUser | null>(this.getUserFromStorage());
 public currentUser$: Observable<AuthUser | null> = this.currentUserSubject.asObservable();
 constructor(
  private http: HttpClient,
  @Inject(PLATFORM_ID) private platformId: object
 ) {}
 /**
 * Ejecuta el login transaccional contra el backend modular.
 * Almacena el JWT mediante efectos secundarios controlados (tap).
 */
 login(credentials: { email: string; password: string }): Observable<LoginResponse> {
 return this.http.post<ApiResponse<LoginResponse>>(`${this.API_URL}/login`, credentials).pipe(
 map(response => {
 if (response.success && response.data) {
 return response.data; // Desempaqueta la envoltura estándar del Backend
 }
 throw new Error('Fallo de autenticación estructural.');
 }),
 tap(data => {
 // Almacenamiento seguro del token
 if (isPlatformBrowser(this.platformId)) {
 localStorage.setItem(this.TOKEN_KEY, data.token);
 }
 // Emisión reactiva del nuevo estado del usuario para toda la app
 this.currentUserSubject.next(data.user);
 })
 );
 }

 logout(): void {
 if (isPlatformBrowser(this.platformId)) {
 localStorage.removeItem(this.TOKEN_KEY);
 }
 this.currentUserSubject.next(null);
 }

 public getToken(): string | null {
 return isPlatformBrowser(this.platformId)
 ? localStorage.getItem(this.TOKEN_KEY)
 : null;
 }

 private getUserFromStorage(): AuthUser | null {
 // Si necesitas persistir datos básicos del usuario (rol, email) al recargar la página
 const token = isPlatformBrowser(this.platformId)
 ? localStorage.getItem(this.TOKEN_KEY)
 : null;
 return token ? { rol: 'alumno' } : null; // Lógica simplificada o parseo de Claims JWT
 }
}
