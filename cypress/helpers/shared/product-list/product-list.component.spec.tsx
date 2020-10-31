import { IProduct } from "../../../../modules/shared/models/product.model";
import ProductCardDetailTest, { ProductLinkTest } from "../product-card/product-card.component.spec";

export default function ProductListTest(input: IProduct[]) {
  input.forEach(el => ProductCardDetailTest(el));
  ProductLinkTest();
}
