import { get } from "../shared/crud/crud.service";
import { categoryUrl } from "../shared/models/category.model";

export async function getCategory(categoryId: number) {
    return await get(categoryUrl, categoryId);
}
