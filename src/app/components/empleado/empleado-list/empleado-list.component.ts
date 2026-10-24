import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Employee } from '../../../models/empleado';

@Component({
  selector: 'app-empleado-list',
  templateUrl: './empleado-list.component.html'
})
export class EmpleadoListComponent {
  @Input() employees: Employee[] = [];
  @Output() edit = new EventEmitter<Employee>();
  @Output() delete = new EventEmitter<Employee>();

  searchTerm = '';

  get filteredEmployees(): Employee[] {
    const query = this.normalize(this.searchTerm.trim());
    if (!query) return this.employees;

    return this.employees.filter((employee) =>
      [employee.name, employee.position, employee.department]
        .some((value) => this.normalize(value).includes(query))
    );
  }

  updateSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value;
  }

  clearSearch(input: HTMLInputElement): void {
    input.value = '';
    this.searchTerm = '';
  }

  private normalize(value: string): string {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  }
}
