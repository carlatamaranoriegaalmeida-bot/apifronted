import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmpleadoComponent } from './components/empleado/empleado.component';
import { EmpleadoFormComponent } from './components/empleado/empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './components/empleado/empleado-list/empleado-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EmpleadoService } from './services/empleado.service';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { LoginFormComponent } from './features/auth/components/login-form.component';
import { LoginDashboardComponent } from './features/auth/login-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    EmpleadoComponent,
    EmpleadoFormComponent,
    EmpleadoListComponent,
    LoginFormComponent,
    LoginDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    provideClientHydration(),
    EmpleadoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
