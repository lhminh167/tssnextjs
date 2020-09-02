import { Container } from "@material-ui/core";
import { getCategories, getCategory } from "../../../modules/category/category.service";
import { CategoryDetailMetadataComponent } from "../../../modules/category/detail/category-detail-metadata.component";
import CategoryDetailComponent from "../../../modules/category/detail/category-detail.component";
import CategoryDetailProductListComponent from "../../../modules/category/detail/product-list/category-detail-product-list.component";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import { toNumber } from "../../../modules/shared/helpers/auth.helper";
import { toUrl } from "../../../modules/shared/helpers/string.helper";
import { ICategory } from "../../../modules/shared/models/category.model";

interface Props {
    data: ICategory
}

export default function CategoryDetailPage({
    data
}: Props) {
    return (
        <Container>
            <ErrorBoundary>
                <CategoryDetailComponent
                    data={data}
                />
            </ErrorBoundary>
            <ErrorBoundary>

                <CategoryDetailProductListComponent
                    data={data}
                />
            </ErrorBoundary>
            <ErrorBoundary>
                <CategoryDetailMetadataComponent
                    data={data}
                />
            </ErrorBoundary>
        </Container>

    );
}

export async function getStaticPaths() {
    const res = await getCategories();
    const items: ICategory[] = res.content;

    const paths = items.map((item) => ({
        params: {
            categoryName: toUrl(item.name),
            categoryId: item.categoryId.toString()
        },
    }))

    return { paths, fallback: false }
}


export async function getStaticProps({ params }) {

    const response: any = await getCategory(toNumber(params.categoryId));

    return {
        props: { data: response.content },
        revalidate: null
    }
}
