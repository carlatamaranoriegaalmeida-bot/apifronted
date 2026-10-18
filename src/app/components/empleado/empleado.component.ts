import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleadoService } from '../../services/empleado.service';
import { Employee } from '../../models/empleado';
import { EMPLEADO_MESSAGES } from './empleado.messages';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {

  public empleados$: Observable<Employee[]>;
  readonly messages = EMPLEADO_MESSAGES;

  errorMessage: string = '';
  successMessage: string = '';
  editingEmployeeId: string | null = null;

  employeeForm: Employee = this.createEmptyEmployee();

  constructor(private empleadoService: EmpleadoService) {

    this.empleados$ = this.empleadoService.empleados$;
  }

  ngOnInit(): void {
    this.empleadoService.loadEmpleados();
  }

  saveEmployee(employee: Employee): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.editingEmployeeId) {
      this.empleadoService.updateEmployee(this.editingEmployeeId, employee).subscribe({
        next: () => {
          this.successMessage = this.messages.success.updated;
          this.cleanForm();
        },
        error: (err) => this.handleError(err)
      });
    } else {
      this.empleadoService.createEmployee(employee).subscribe({
        next: () => {
          this.successMessage = this.messages.success.created;
          this.cleanForm();
        },
        error: (err) => this.handleError(err)
      });
    }
  }

  updateEmployee(empleado: Employee): void {
    this.editingEmployeeId = empleado.id || empleado._id || null;
    this.employeeForm = { ...empleado };
    this.errorMessage = '';
    this.successMessage = '';
  }

  deleteEmployee(employee: Employee): void {
    const id = employee.id || employee._id;
    if (!id) return;

    this.errorMessage = '';
    this.successMessage = '';

    this.empleadoService.deleteEmployee(id).subscribe({
      next: () => {
        this.successMessage = this.messages.success.deleted;
      },
      error: (err) => this.handleError(err)
    });
  }

  cleanForm(): void {
    this.employeeForm = this.createEmptyEmployee();
    this.editingEmployeeId = null;
  }

  private createEmptyEmployee(): Employee {
    return { name: '', position: '', department: '', salary: 0 };
  }

  private handleError(err: any): void {
    const validationErrors = err.error?.data;
    this.errorMessage = Array.isArray(validationErrors)
      ? validationErrors.join('. ')
      : err.error?.message || this.messages.error.operationFailed;
    console.error(err);
  }
}