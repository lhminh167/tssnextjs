import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../root/root.model";
import { UploadRequest } from "../../shared/crud/crud.model";
import { upload } from "../../shared/crud/crud.service";
import { goTo, toNumber } from "../../shared/helpers/auth.helper";
import { toUrl } from "../../shared/helpers/string.helper";
import { IAttributeValue } from "../../shared/models/attribute-value.model";
import { defaultProduct } from "../../shared/models/product.model";
import { isValidForm } from "../../shared/validator/validator";
import {
  IProductFilterCategory,
  ProductFilterFilterEnum,
  productUrl,
} from "../filter/product-filter.model";
import productFilterSlice from "../filter/product-filter.slice";
import CreateProductComponent from "./create-product.component";
import {
  CreateProductStateValidator,
  defaultCreateProductState,
  ICreateProductRequest,
  ICreateProductState,
} from "./create-product.model";
import { createProduct } from "./create-product.service";

export default function CreateProductContainer() {
  const [state, setState] = useState<ICreateProductState>(
    defaultCreateProductState
  );
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [productId, setProductId] = useState<number>(0);
  let errors = new CreateProductStateValidator().validate(state);
  const colors = useSelector<IRootState, IAttributeValue[]>((state) =>
    state.productFilter.filter?.data?.attributes.filter(
      (a) => a.name === ProductFilterFilterEnum.Color
    )
  );
  const sizes = useSelector<IRootState, IAttributeValue[]>((state) =>
    state.productFilter.filter?.data?.attributes.filter(
      (a) => a.name === ProductFilterFilterEnum.Size
    )
  );
  const categories = useSelector<IRootState, IProductFilterCategory[]>(
    (state) => state.productFilter.filter?.data?.categories
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (!categories.length)
      dispatch(productFilterSlice.actions.getFilterPending());
  }, []);

  function change(event: ChangeEvent<HTMLInputElement>) {
    const target = event.target;
    const name = target.name;
    let value: any = target.value;
    const type = target.type;

    if (type === "file") value = target.files[0];

    setState({
      ...state,
      [name]: value,
    });
  }

  async function submit() {
    setSubmitted(true);
    if (!isValidForm(errors)) return;

    const images: UploadRequest[] = [
      { name: toUrl(state.name) + "-thumbnail", file: state.thumbnail },
      { name: toUrl(state.name), file: state.image },
      { name: toUrl(state.name) + "-2", file: state.image2 },
    ];
    const data: ICreateProductRequest = {
      name: state.name.trim(),
      description: state.description.trim(),
      price: toNumber(state.price),
      discountedPrice: toNumber(state.discountedPrice),
      categoryId: toNumber(state.categoryId),
      attributes: [...state.color, ...state.size].map((x) => toNumber(x)),
      display: toNumber(state.display),
      thumbnail: images[0].name,
      image: images[1].name,
      image2: images[2].name,
    };

    await upload(images);
    const response = await createProduct(data);

    setProductId(response.content.productId);
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
  }

  function showProductDetail() {
    goTo(
      productUrl.detail({
        ...defaultProduct,
        name: state.name,
        productId: productId,
      }).as,
      "",
      ""
    );
  }

  function resetForm() {
    setState(defaultCreateProductState);
    closeDialog();
  }

  return (
    <CreateProductComponent
      state={state}
      submitted={submitted}
      isDialogOpen={isDialogOpen}
      errors={errors}
      categories={categories}
      sizes={sizes}
      colors={colors}
      showProductDetail={showProductDetail}
      resetForm={resetForm}
      submit={submit}
      change={change}
      closeDialog={closeDialog}
    />
  );
}
