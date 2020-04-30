import {
  defaultProductFilterCategory,
  IProductFilterCategory
} from "../../product/filter/product-filter.model";
import {
  defaultPaginationList,
  defaultPaginationRequest,
  PaginatedList,
  PaginationRequest
} from "../crud/crud.model";
import { IAttributeValue } from "./attribute-value.model";
import { IReviewGetResponse } from "./review.model";
import { SelectOption } from "./shared.model";

export const productUrl = "product";

export interface IProduct {
  productId: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: string;
  image2: string;
  thumbnail: string;
  display: number;
  attributes: IAttributeValue[];
  category: IProductFilterCategory;
  review: IReviewGetResponse;
  recommendation: PaginatedList<IProduct>;
}

export const defaultProduct: IProduct = {
  productId: 0,
  name: "",
  description: "",
  price: 0,
  discountedPrice: 0,
  image: "",
  image2: "",
  thumbnail: "",
  display: 0,
  attributes: [],
  category: defaultProductFilterCategory,
  review: defaultPaginationList,
  recommendation: {
    pageSize: 4,
    ...defaultPaginationList
  }
};

export interface IProductRecommendationGetRequest extends PaginationRequest {
  productId: number;
}

export const defaultProductRecommendationGetRequest: IProductRecommendationGetRequest = {
  ...defaultPaginationRequest,
  isPagingEnabled: true,
  pageSize: 4,
  productId: 0
};

export enum ProductDisplayEnum {
  Other = 1,
  HomepageFirstPanel = 2
}

export const productDisplayOptions: SelectOption[] = [
  {
    label: "Homepage First Panel",
    value: ProductDisplayEnum.HomepageFirstPanel
  },
  {
    label: "Other",
    value: ProductDisplayEnum.Other
  },
];

export interface HomepageProducts {
  topPanel: PaginatedList<IProduct>;
  mostDiscounted: PaginatedList<IProduct>;
  bestSelling: PaginatedList<IProduct>;
  topRated: PaginatedList<IProduct>;
  newest: PaginatedList<IProduct>;
}
