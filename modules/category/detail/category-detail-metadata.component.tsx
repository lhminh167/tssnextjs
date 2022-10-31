import { Fragment } from "react";
import { WebSite, WithContext } from "schema-dts";
import ErrorBoundary from "../../shared/error-boundary/error-boundary.component";
import { MetadataComponent } from "../../shared/metadata/metadata.component";
import { PageType, RobotsContent } from "../../shared/metadata/metadata.model";
import { ICategory } from "../../shared/models/category.model";
import { StructuredDataComponent } from "../../shared/structured-data/structured-data.component";

interface Props {
  // #region Properties (1)

  data: ICategory;

  // #endregion Properties (1)
}

export function CategoryDetailMetadataComponent({ data }: Props) {
  const state: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: process.env.NEXT_PUBLIC_SITE_NAME,
  };

  return (
    <Fragment>
      <ErrorBoundary>
        <MetadataComponent
          data={{
            title: data.name,
            description: data.description,
            canonical: "",
            type: PageType.Website,
            image: data?.product?.items
              ? data?.product?.items[0]?.thumbnail
              : "",
            robots: [RobotsContent.Index, RobotsContent.Follow].join(","),
          }}
        ></MetadataComponent>
      </ErrorBoundary>
      <ErrorBoundary>
        <StructuredDataComponent data={state} />
      </ErrorBoundary>
    </Fragment>
  );
}
