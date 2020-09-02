import {
  IState,
  PaginatedList,
  PaginationRequest,
  defaultPaginationRequest
} from '../../shared/crud/crud.model';
import { IAttributeValue } from '../../shared/models/attribute-value.model';
import { ICategory } from '../../shared/models/category.model';
import { IProduct } from '../../shared/models/product.model';
import { SelectOption } from '../../shared/models/shared.model';
import { toUrl } from '../../shared/helpers/string.helper';

const apiProductBaseUrl = 'Product';

export const apiProductUrl = {
  filter: apiProductBaseUrl + '/' + 'Filter',
  choice: apiProductBaseUrl + '/' + 'Choice',
  recommendation: (productId: number) =>
    `${apiProductBaseUrl}/${productId}/Recommendation`,
  product: apiProductBaseUrl,
  homepage: apiProductBaseUrl + '/' + 'Homepage',
};

const productBaseUrl = '/product';

export const productUrl = {
  filter: productBaseUrl + '/' + 'Filter',
  choice: productBaseUrl + '/' + 'Choice',
  recommendation: (productId: number) =>
    `${productBaseUrl}/${productId}/Recommendation`,
  product: productBaseUrl,
  homepage: productBaseUrl + '/' + 'Homepage',
  detail: (product: IProduct) => ({
    href: `${productBaseUrl}/[productName]/[productId]`,
    as: `${productBaseUrl}/${toUrl(product.name)}/${product.productId}`,
  }),
  edit: (product: IProduct) => ({
    href: `${productBaseUrl}/[productName]/[productId]/edit`,
    as: `${productBaseUrl}/${toUrl(product.name)}/${product.productId}/edit`,
  }),
  new: productBaseUrl + '/new'
};


export enum ProductFilterFilterEnum {
  Size = 'Size',
  Color = 'Color'
}

export interface IProductFilterFilter {
  attributes: IAttributeValue[];
  categories: IProductFilterCategory[];
  minPrice: number;
  maxPrice: number;
}

export const filterInitialData: IProductFilterFilter = {
  attributes: [],
  categories: [],
  minPrice: 0,
  maxPrice: 100
};

export interface IProductFilterChoice {
  attributes: IAttributeValue[];
  categories: IAttributeValue[];
  minPrice: number;
  maxPrice: number;
}

export interface IProductFilterState {
  filter: IState<IProductFilterFilter>;
  product: IState<PaginatedList<IProduct>>;
  choice: IProductSearchRequest;
}

export interface IProductFilterCategory {
  categoryId: number;
  name: string;
}

export const defaultProductFilterCategory = {
  categoryId: 0,
  name: ''
};

export interface IProductSearchRequest extends PaginationRequest {
  keyword: string;
  color: string;
  size: string;
  category: string[];
  minPrice: number;
  maxPrice: number;
  display: number;
}

export const defaultProductSearchRequest: IProductSearchRequest = {
  keyword: '',
  color: '',
  size: '',
  category: [],
  minPrice: 0,
  maxPrice: 0,
  isPagingEnabled: true,
  isDescending: true,
  pageIndex: 0,
  pageSize: 8,
  sortBy: '',
  display: 0
};

export enum SortByEnum {
  None = 'None',
  Name = 'Name',
  Price = 'Price',
  BestSelling = 'BestSelling',
  TopRated = 'TopRated',
  MostDiscounted = 'MostDiscounted',
  Newest = 'Newest'
}

export const defaultSortByOptions: SelectOption[] = [
  { label: 'None', value: SortByEnum.None },
  { label: 'Name', value: SortByEnum.Name },
  { label: 'Price', value: SortByEnum.Price },
  { label: 'Best Selling', value: SortByEnum.BestSelling },
  { label: 'Top Rated', value: SortByEnum.TopRated },
  { label: 'Most Discounted', value: SortByEnum.MostDiscounted },
  { label: 'Newest Arrivals', value: SortByEnum.Newest }
];

export const defaultIsDescendingOptions: SelectOption[] = [
  { label: 'Descending', value: true },
  { label: 'Ascending', value: false }
];
