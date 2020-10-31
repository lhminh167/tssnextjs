import { get } from '../shared/crud/crud.service';
import { apiDepartmentUrl } from '../shared/models/department.model';

export async function getDepartments() {
    return await get(apiDepartmentUrl, 0);
}
