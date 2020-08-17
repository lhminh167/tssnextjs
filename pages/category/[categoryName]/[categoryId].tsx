import { makeStyles, Container } from "@material-ui/core";
import { ICategory } from "../../../modules/shared/models/category.model";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import CategoryDetailComponent from "../../../modules/category/detail/category-detail.component";
import CategoryDetailProductListComponent from "../../../modules/category/detail/product-list/category-detail-product-list.component";
import { CategoryDetailMetadataComponent } from "../../../modules/category/detail/category-detail-metadata.component";
import { getCategories, getCategory } from "../../../modules/category/category.service";
import { toNumber } from "../../../modules/shared/helpers/auth.helper";
import { toUrl } from "../../../modules/shared/helpers/string.helper";

const useStyles = makeStyles({
});

interface Props {
    data: ICategory
}

export default function CategoryDetailPage({
    data
}: Props) {
    const classes = useStyles({});
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
        revalidate: 5
    }
}
