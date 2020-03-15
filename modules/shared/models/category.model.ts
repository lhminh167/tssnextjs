export const categoryUrl = 'categories';

export interface ICategory {
    categoryId: number;
    name: string;
    departmentId: number;
    description: string;
}

export const defaultCategory: ICategory = {
    categoryId: 0,
    name: '',
    departmentId: 0,
    description: ''
}