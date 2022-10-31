import { Container } from "@mui/material";
import Error from "next/error";
import { useRouter } from "next/router";
import {
  getCategories,
  getCategory,
} from "../../../modules/category/category.service";
import { CategoryDetailMetadataComponent } from "../../../modules/category/detail/category-detail-metadata.component";
import CategoryDetailComponent from "../../../modules/category/detail/category-detail.component";
import CategoryDetailProductListComponent from "../../../modules/category/detail/product-list/category-detail-product-list.component";
import { IResponse } from "../../../modules/shared/crud/crud.model";
import ErrorBoundary from "../../../modules/shared/error-boundary/error-boundary.component";
import { toNumber } from "../../../modules/shared/helpers/auth.helper";
import { isOk } from "../../../modules/shared/helpers/http.helper";
import {
  removeTrailingDot,
  toUrl,
} from "../../../modules/shared/helpers/string.helper";
import { ICategory } from "../../../modules/shared/models/category.model";

interface Props extends IResponse<ICategory> {}

export default function CategoryDetailPage({
  content: data,
  status,
  title,
}: Props) {
  const router = useRouter();
  if (router.isFallback) return <h1>Loading...</h1>;
  if (!isOk(status))
    return <Error statusCode={status} title={removeTrailingDot(title)} />;

  return (
    <Container>
      <ErrorBoundary>
        <CategoryDetailComponent data={data} />
      </ErrorBoundary>
      <ErrorBoundary>
        <CategoryDetailProductListComponent data={data} />
      </ErrorBoundary>
      <ErrorBoundary>
        <CategoryDetailMetadataComponent data={data} />
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
      categoryId: item.categoryId.toString(),
    },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({
  params,
}: {
  params: { categoryId: string };
}) {
  const response: any = await getCategory(toNumber(params.categoryId));

  return {
    props: { ...response },
    revalidate: 86400,
  };
}
