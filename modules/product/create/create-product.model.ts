import { Validator } from "fluentvalidation-ts";
import { toNumber } from "../../shared/helpers/auth.helper";
import { beRequired } from "../../shared/validator/validator";

export interface ICreateProductState {
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

export const defaultCreateProductState: ICreateProductState = {
  name: "",
  description: "",
  price: "0",
  discountedPrice: "0",
  // @ts-ignore
  image: "",
  // @ts-ignore
  image2: null,
  // @ts-ignore
  thumbnail: null,
  display: "0",
  size: [],
  color: [],
  categoryId: "",
};

export class CreateProductStateValidator extends Validator<ICreateProductState> {
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
      .must((value) => value.size > 0);

    this.ruleFor("image2")
      .notNull()
      .must((value) => value.size > 0);

    this.ruleFor("thumbnail")
      .notNull()
      .must((value) => value.size > 0);

    this.ruleFor("display").must((value) => toNumber(value) > 0);

    this.ruleFor("size").must((value) => value.length > 0);

    this.ruleForEach("size").must((value) => toNumber(value) > 0);

    this.ruleFor("color").must((value) => value.length > 0);

    this.ruleForEach("color").must((value) => toNumber(value) > 0);

    this.ruleFor("categoryId").must((value, model) => toNumber(value) > 0);
  }
}

export interface ICreateProductRequest {
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

export const defaultCreateProductRequest: ICreateProductRequest = {
  name: "",
  description: "",
  price: 0,
  discountedPrice: 0,
  image: "",
  image2: "",
  thumbnail: "",
  display: 0,
  attributes: [],
  categoryId: 0,
};
