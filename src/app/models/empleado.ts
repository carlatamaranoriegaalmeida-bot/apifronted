export interface Employee { 
    name: string 
    position: string 
    department: string 
    salary: number
    createdAt?:string 
    updatedAt?: string 
    id?: string
    _id?: string 
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}