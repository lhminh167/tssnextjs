import { Validator } from "fluentvalidation-ts";
import { toNumber } from "../../shared/helpers/auth.helper";
import { removeFileExtension } from "../../shared/helpers/string.helper";
import {
  getImage2Name,
  getImageName,
  getThumbnailName,
} from "../../shared/models/product.model";
import { beRequired } from "../../shared/validator/validator";

export interface IEditProductState {
  productId: number;
  name: string;
  description: string;
  price: string;
  discountedPrice: string;
  image: File;
  image2: File;
  thumbnail: File;
  display: string;
  size: string[];
  color: string[];
  categoryId: string;
}

export const defaultEditProductState: IEditProductState = {
  productId: 0,
  name: "",
  description: "",
  price: "0",
  discountedPrice: "0",
  image: "",
  image2: null,
  thumbnail: null,
  display: "0",
  size: [],
  color: [],
  categoryId: "",
};

export class EditProductStateValidator extends Validator<IEditProductState> {
  constructor() {
    super();

    this.ruleFor("name").must(beRequired());

    this.ruleFor("description").must(beRequired());

    this.ruleFor("price").must((value) => toNumber(value) > 0);

    this.ruleFor("discountedPrice")
      .must(
        (discountedPrice, model) =>
          toNumber(discountedPrice) < toNumber(model.price)
      )
      .withMessage("Discounted price should be less than original price");

    this.ruleFor("image")
      .notNull()
      .must(
        (value, model) =>
          getImageName(model.name) === removeFileExtension(value.name) ||
          value.size > 0
      );

    this.ruleFor("image2")
      .notNull()
      .must(
        (value, model) =>
          getImage2Name(model.name) === removeFileExtension(value.name) ||
          value.size > 0
      );

    this.ruleFor("thumbnail")
      .notNull()
      .must(
        (value, model) =>
          getThumbnailName(model.name) === removeFileExtension(value.name) ||
          value.size > 0
      );

    this.ruleFor("display").must((value) => toNumber(value) > 0);

    this.ruleFor("size").must((value) => value.length > 0);

    this.ruleForEach("size").must((value) => toNumber(value) > 0);

    this.ruleFor("color").must((value) => value.length > 0);

    this.ruleForEach("color").must((value) => toNumber(value) > 0);

    this.ruleFor("categoryId").must((value, model) => toNumber(value) > 0);
  }
}

export interface IEditProductRequest {
  productId: number;
  name: string;
  description: string;
  price: number;
  discountedPrice: number;
  image: string;
  image2: string;
  thumbnail: string;
  display: number;
  attributes: number[];
  categoryId: number;
}

export const defaultEditProductRequest: IEditProductRequest = {
  productId: 0,
  name: "",
  description: "",
  price: 0,
  discountedPrice: 0,
  image: "",
  image2: "",
  thumbnail: "",
  display: 1,
  attributes: [],
  categoryId: 0,
};

export const defaultFile: File = {
  name: null,
  lastModified: null,
  size: null,
  type: null,
  arrayBuffer: null,
  slice: null,
  stream: null,
  text: null,
};
