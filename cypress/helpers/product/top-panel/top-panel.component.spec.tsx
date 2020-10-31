import { IProduct } from "../../../../modules/shared/models/product.model";
import { PRODUCT_CARD } from "../../../../modules/shared/tag/tag.model";

export default function TopPanelTest(input: IProduct[]) {
  const condition = input.map(e => 2);
  const data = input.map(e => e.display);
  cy
    .wrap(data)
    .should('deep.equal', condition);
  return cy;
}
