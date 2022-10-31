import { Fragment } from "react";
import { WebSite, WithContext } from "schema-dts";
import ErrorBoundary from "../../shared/error-boundary/error-boundary.component";
import { MetadataComponent } from "../../shared/metadata/metadata.component";
import { PageType, RobotsContent } from "../../shared/metadata/metadata.model";
import { StructuredDataComponent } from "../../shared/structured-data/structured-data.component";

interface Props {
  // data: HomepageProducts
}

export function LoginMetadataComponent({}: // data
Props) {
  const now = new Date();
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
            title: "Sign In",
            description: `You could log in to your ${process.env.NEXT_PUBLIC_SITE_NAME} account on this page.`,
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
