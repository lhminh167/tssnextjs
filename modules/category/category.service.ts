import { get } from "../shared/crud/crud.service";
import { categoryUrl } from "../shared/models/category.model";

export async function getCategories() {
    return await get(categoryUrl, 0);
}

export async function getCategory(categoryId: number) {
    return await get(categoryUrl, categoryId);
}
