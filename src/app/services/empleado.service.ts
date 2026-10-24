import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
import { Employee, ApiResponse } from '../models/empleado';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EmpleadoService { 

  private apiUrl = 'http://localhost:3000/api/v1/empleados';

  private empleadosSubject = new BehaviorSubject<Employee[]>([]);

  public empleados$: Observable<Employee[]> = this.empleadosSubject.asObservable();

  selectedEmpleado: Employee = { name: '', position: '', department: '', salary: 0 }; 

  constructor(private http: HttpClient) {} 


  loadEmpleados(): void {
    this.http.get<ApiResponse<Employee[]>>(this.apiUrl).pipe(
      map(response => response.data)
    ).subscribe({
      next: (empleados) => {
        this.empleadosSubject.next([...empleados]);
      },
      error: (err) => console.error('Error al cargar empleados:', err)
    });
  }


  getEmployees(): Observable<Employee[]> {
    return this.http.get<ApiResponse<Employee[]>>(this.apiUrl).pipe(
      map(response => response.data),
      tap(empleados => this.empleadosSubject.next([...empleados]))
    );
  }

  createEmployee(empleado: Employee): Observable<Employee> {
    return this.http.post<ApiResponse<Employee>>(this.apiUrl, empleado).pipe(
      map(response => response.data),
      tap((nuevoEmpleado) => {
        const current = this.empleadosSubject.value;
        this.empleadosSubject.next([...current, nuevoEmpleado]);
      })
    );
  }

  updateEmployee(id: string, empleado: Partial<Employee>): Observable<Employee> {
    return this.http.put<ApiResponse<Employee>>(`${this.apiUrl}/${id}`, empleado).pipe(
      map(response => response.data),
      tap((updatedEmployee) => {
        const current = this.empleadosSubject.value;
        const updatedList = current.map(emp => 
          ((emp as any).id === id || (emp as any)._id === id) ? updatedEmployee : emp
        );
        this.empleadosSubject.next(updatedList);
      })
    );
  }

  deleteEmployee(id: string): Observable<null> {
    return this.http.delete<ApiResponse<null>>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.data),
      tap(() => {
        const current = this.empleadosSubject.value;
        const filteredList = current.filter(emp => 
          (emp as any).id !== id && (emp as any)._id !== id
        );
        this.empleadosSubject.next(filteredList);
      })
    );
  }
}