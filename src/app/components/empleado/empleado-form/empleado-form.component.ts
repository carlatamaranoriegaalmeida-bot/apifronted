import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from '../../../models/empleado';
import { EMPLEADO_MESSAGES } from '../empleado.messages';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html'
})
export class EmpleadoFormComponent implements OnChanges {
  @Input() employee: Employee = this.createEmptyEmployee();
  @Input() editing = false;
  @Input() errorMessage = '';
  @Input() successMessage = '';
  @Output() save = new EventEmitter<Employee>();
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('form') private form?: NgForm;

  readonly messages = EMPLEADO_MESSAGES;
  employeeForm: Employee = this.createEmptyEmployee();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employee']) {
      this.employeeForm = { ...this.employee };
      this.form?.resetForm(this.employeeForm);
    }
  }

  submit(form: NgForm): void {
    if (form.invalid || this.employeeForm.salary <= 0) {
      form.control.markAllAsTouched();
      return;
    }

    this.save.emit({ ...this.employeeForm });
  }

  requestCancel(): void {
    this.cancel.emit();
  }

  private createEmptyEmployee(): Employee {
    return { name: '', position: '', department: '', salary: 0 };
  }
}
