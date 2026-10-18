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
}
