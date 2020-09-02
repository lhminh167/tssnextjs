export default function ProductCardComponentTest() {
  describe('ProductCardComponentTest', () => {

    it('should redirect to product detail page when clicked', () => {
      cy.getEl('productCard').first().click();
      cy.getEl('productLink').first().getLink().load();
    });

    it('should show product image', () => {

    });


  });
}
