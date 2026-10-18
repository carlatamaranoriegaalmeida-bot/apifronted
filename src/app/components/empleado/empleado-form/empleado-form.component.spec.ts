import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, NgForm } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { EmpleadoFormComponent } from './empleado-form.component';

describe('EmpleadoFormComponent', () => {
  let component: EmpleadoFormComponent;
  let fixture: ComponentFixture<EmpleadoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule, FormsModule],
      declarations: [EmpleadoFormComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit a copy of valid form data', () => {
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    const emitted = jasmine.createSpy('save');
    component.save.subscribe(emitted);
    form.form.setValue({
      name: 'Ana Pérez',
      position: 'Desarrolladora',
      department: 'Tecnología',
      salary: 45000
    });

    component.submit(form);

    expect(emitted).toHaveBeenCalledWith({
      name: 'Ana Pérez',
      position: 'Desarrolladora',
      department: 'Tecnología',
      salary: 45000
    });
  });

  it('should not emit invalid form data', () => {
    const form = fixture.debugElement.query(By.directive(NgForm)).injector.get(NgForm);
    const emitted = jasmine.createSpy('save');
    component.save.subscribe(emitted);

    component.submit(form);

    expect(emitted).not.toHaveBeenCalled();
    expect(form.control.touched).toBeTrue();
  });
});
