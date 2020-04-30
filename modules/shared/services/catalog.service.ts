import { get } from "../crud/crud.service";
import { catalogUrl, defaultCatalogGetRequest, ICatalogGetRequest } from "../models/catalog.model";

export async function getCatalog(input: ICatalogGetRequest) {
    return await get(catalogUrl.get(input));
}
