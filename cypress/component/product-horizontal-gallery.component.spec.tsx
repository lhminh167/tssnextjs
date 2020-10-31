import React from 'react'
import { mount } from 'cypress-react-unit-test'
import MostDiscountedProductGalleryComponent from '../../modules/product/most-discounted/most-discounted-product-gallery.component';

it('works', () => {
    cy
        .fixture('most-discounted-products.json').its('content')
        .then(res => mount(
            <MostDiscountedProductGalleryComponent
                data={res}
            />
        ))
})
