import { Fragment } from "react";
import { WebSite, WithContext } from "schema-dts";
import ErrorBoundary from "../../shared/error-boundary/error-boundary.component";
import { MetadataComponent } from "../../shared/metadata/metadata.component";
import { PageType, RobotsContent } from "../../shared/metadata/metadata.model";
import { StructuredDataComponent } from "../../shared/structured-data/structured-data.component";

interface Props {
  // data: HomepageProducts
}

export function CustomerDetailMetadataComponent({}: // data
Props) {
  const now = new Date();
  const state: WithContext<WebSite> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    url: process.env.NEXT_PUBLIC_SITE_URL,
  };

  return (
    <Fragment>
      <ErrorBoundary>
        <MetadataComponent
          data={{
            title: "User's Details",
            description:
              "You could take a look at user's details on this page.",
            canonical: "",
            type: PageType.Website,
            image: "",
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
