import { get } from '../shared/crud/crud.service';
import { departmentUrl } from '../shared/models/department.model';

export async function getDepartments() {
    return await get(departmentUrl, 0);
}
