export const EMPLEADO_MESSAGES = {
  validation: {
    nameRequired: 'El nombre es obligatorio.',
    positionRequired: 'El cargo es obligatorio.',
    departmentRequired: 'El departamento es obligatorio.',
    salaryPositive: 'El salario debe ser un número positivo.'
  },
  success: {
    created: 'Empleado creado exitosamente',
    updated: 'Empleado actualizado exitosamente',
    deleted: 'Empleado eliminado correctamente'
  },
  error: {
    operationFailed: 'Ocurrió un error en la operación'
  }
} as const;
