import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { EmpleadoComponent } from './empleado.component';
import { EmpleadoFormComponent } from './empleado-form/empleado-form.component';
import { EmpleadoListComponent } from './empleado-list/empleado-list.component';
import { EmpleadoService } from '../../services/empleado.service';

describe('EmpleadoComponent', () => {
  let component: EmpleadoComponent;
  let fixture: ComponentFixture<EmpleadoComponent>;
  const empleadoService = {
    empleados$: of([]),
    loadEmpleados: jasmine.createSpy('loadEmpleados')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [EmpleadoComponent, EmpleadoFormComponent, EmpleadoListComponent],
      providers: [{ provide: EmpleadoService, useValue: empleadoService }]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employees and render the presentational components', () => {
    expect(empleadoService.loadEmpleados).toHaveBeenCalled();
    expect(fixture.nativeElement.querySelector('app-empleado-form')).toBeTruthy();
    expect(fixture.nativeElement.querySelector('app-empleado-list')).toBeTruthy();
  });
});
