import { ICategory } from './category.model';

export const departmentUrl = 'department';

export interface IDepartment {
    departmentId: number;
    name: string;
    description: string;
    category: ICategory[];
}

export const defaultDepartment: IDepartment = {
    departmentId: 0,
    name: '',
    description: '',
    category: []
}
