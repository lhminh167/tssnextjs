describe('commonly used functionality', () => {
    before(() => {
        cy.visit('/');
    })

    it('create an order', () => {
        cy.getEl('productCard').first().click();
        cy.getEl('productLink').first().getLink().load();

        cy.getEl('size').last().click();
        cy.getEl('color').last().click();
        cy.getEl('addToCart').click();
        cy.getEl('shoppingCart').click();
        cy.getEl('shoppingCart').getLink().load();

        cy.getEl('checkout').click();
        cy.load('/user/login?next=/order/new');

        cy.getEl('register').click();
        cy.getEl('register').getLink().load();

        const randomStr = randomString(5);

        cy.typeRegister({
            name: randomStr,
            email: randomStr + '@gmail.com',
            password: randomStr
        });
        cy.getEl('submit').click();

        cy.load('/order/new');
        cy.typeCheckout({
            address1: randomStr,
            address2: randomStr,
            city: randomStr,
            region: randomStr,
            postalCode: randomStr,
            country: randomStr,
            mobPhone: randomStr,
            dayPhone: randomStr,
            evePhone: randomStr,
            shippingId: 2,
        });
        cy.getEl('next').click();
        cy.getEl('order-summary');
        cy.getEl('grand-total').should('not.eq', '$0.00');
        cy.getEl('next').click();
        cy.getWithinIframe('[name="cardnumber"]').type('4242424242424242');
        cy.getWithinIframe('[name="exp-date"]').type('1232');
        cy.getWithinIframe('[name="cvc"]').type('987');
        cy.getWithinIframe('[name="postal"]').type('12345');
        cy.getEl('next').click();


    })
})

function randomString(length: number) {
    return Math.random().toString(36).substring(length);
}
