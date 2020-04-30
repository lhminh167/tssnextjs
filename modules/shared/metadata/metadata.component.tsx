import Head from 'next/head';
import { Metadata } from './metadata.model';

export interface Props {
    data: Metadata;
}

export function MetadataComponent({
    data
}: Props) {

    return (
        <Head>
            <title key="title">{data.title}</title>
            <meta name="description" key="description" content={data.description} />

            <meta property="og:type" key="og_type" content={data.type} />
            <meta property="og:title" key="og_title" content={data.title} />
            <meta property="og:description" key="og_description" content={data.description} />
            <meta property="og:url" key="og_URL" content={data.og_URL ? data.og_URL : data.canonical} />
            <meta property="og:image" key="og_image" content={data.og_image ? data.og_image : data.image} />
            <meta property="og:site_name" key="og_site_name"
                content={data.og_site_name ? data.og_site_name : data.title} />

            {data.twitter_site ?
                <meta name="twitter:card" key="twitter_card" content="summary" /> : null}
            {data.description ?
                <meta name="twitter:description" key="twitter_description" content={data.description} /> : null}
            {data.twitter_site ?
                <meta name="twitter:site" key="twitter_site" content={data.twitter_site} /> : null
            }
            {data.twitter_domain ?
                <meta name="twitter:domain" key="twitter_domain" content={data.twitter_domain} />
                : null
            }
            {data.twitter_site ?
                <meta name="twitter:image:src" key="twitter_img" content={data.image} /> : null}

            <meta name="robots" content={`${data.robots}`} />
            <link rel="canonical" key="canonical" href={data.canonical} />

        </Head>
    )
}
