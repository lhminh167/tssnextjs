import Link from 'next/link';
import { Fragment } from 'react';
import ProductFilter from '../product.filter/product.filter.component';
import ProductCard from '../product.card/product.card.component';


function Page(props) {

    const {
        error,
        linkTo,
        NavigateTo,
        title,
    } = props;

    return (
        <Fragment>

            <h1>{title}</h1>

            <nav>
                <Link href={linkTo}>
                    <a>Navigate: {NavigateTo}</a>
                </Link>
            </nav>

            <ProductFilter />

            <ProductCard />

        </Fragment>
    )
}

export default Page;

