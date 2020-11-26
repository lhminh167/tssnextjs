import { Typography } from "@material-ui/core";
import React, { useState } from "react";
import { PaginatedList } from "../../../../modules/shared/crud/crud.model";
import { IProduct } from "../../../../modules/shared/models/product.model";
import ProductHorizontalGallery from "../../../../modules/shared/product-horizontal-gallery/product-horizontal-gallery.component";
import { DiscountIcon } from "../../../../modules/shared/svg/svg.component";
import { MOST_DISCOUNTED } from "../../../../modules/shared/tag/tag.model";
import { paginateData } from "../../shared/pagination/pagination.component.spec";

interface Props {
    data: PaginatedList<IProduct>;
}

export default function MostDiscountedProductGalleryComponentMock({ data }: Props) {
    const [state, setState] = useState<PaginatedList<IProduct>>(data);

    async function change({ pageIndex, pageSize }) {
        const response = paginateData(data, pageIndex, pageSize);
        setState(response);
    }

    return (
        <ProductHorizontalGallery
            galleryTestId={MOST_DISCOUNTED}
            data={state}
            output={change}
            title={
                <Typography variant='h6' component='h2'>
                    Most Discounted
        </Typography>
            }
            titleIcon={
                <DiscountIcon
                    color='primary'
                    style={{
                        fontSize: '4rem'
                    }}
                />
            }
        />
    );
}
