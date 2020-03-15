import { get } from "../shared/crud/crud.service";
import { departmentUrl } from "../shared/models/department.model";

export async function getCategory(categoryId: number) {
    return await get(departmentUrl, categoryId);
}
