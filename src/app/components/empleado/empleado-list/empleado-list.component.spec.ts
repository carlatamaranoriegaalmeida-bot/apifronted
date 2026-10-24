import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmpleadoListComponent } from './empleado-list.component';

describe('EmpleadoListComponent', () => {
  let component: EmpleadoListComponent;
  let fixture: ComponentFixture<EmpleadoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonModule],
      declarations: [EmpleadoListComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit employee actions from the table', () => {
    const employee = {
      id: 'employee-id',
      name: 'Ana Pérez',
      position: 'Desarrolladora',
      department: 'Tecnología',
      salary: 45000
    };
    const edit = jasmine.createSpy('edit');
    const remove = jasmine.createSpy('delete');
    component.employees = [employee];
    component.edit.subscribe(edit);
    component.delete.subscribe(remove);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('button');
    buttons[0].click();
    buttons[1].click();

    expect(edit).toHaveBeenCalledWith(employee);
    expect(remove).toHaveBeenCalledWith(employee);
  });

  it('should filter employees without requiring accents in the search term', () => {
    const ana = {
      name: 'Ana Pérez',
      position: 'Desarrolladora',
      department: 'Tecnología',
      salary: 45000
    };
    component.employees = [
      ana,
      {
        name: 'Luis Gómez',
        position: 'Analista',
        department: 'Finanzas',
        salary: 40000
      }
    ];
    component.searchTerm = 'perez';

    expect(component.filteredEmployees).toEqual([ana]);
  });

  it('should clear the search field and restore all employees', () => {
    const input = document.createElement('input');
    input.value = 'Ana';
    component.searchTerm = 'Ana';
    component.employees = [
      { name: 'Ana Pérez', position: 'Diseñadora', department: 'Diseño', salary: 45000 }
    ];

    component.clearSearch(input);

    expect(input.value).toBe('');
    expect(component.searchTerm).toBe('');
    expect(component.filteredEmployees).toHaveSize(1);
  });
});
