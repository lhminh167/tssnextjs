import Head from 'next/head';
import { Metadata } from './metadata.model';
import { TITLE, DESCRIPTION, OG_TYPE, OG_TITLE, OG_DESCRIPTION, OG_URL, OG_IMAGE, OG_NEXT_PUBLIC_SITE_NAME, TWITTER_CARD, TWITTER_DESCRIPTION, TWITTER_SITE, TWITTER_DOMAIN, TWITTER_IMAGE, ROBOTS, CANONICAL } from './metadata.tag';

export interface Props {
    data: Metadata;
}

export function MetadataComponent({
    data
}: Props) {
    const title = data.shouldPrefixSiteName ?
        process.env.NEXT_PUBLIC_SITE_NAME + ' | ' + data.title :
        data.title + ' | ' + process.env.NEXT_PUBLIC_SITE_NAME;

    return (
        <Head>
            <title
                key='title'
                data-cy={TITLE}
            >
                {title}
            </title>
            <meta
                name='description'
                key='description'
                content={data.description}
                data-cy={DESCRIPTION}
            />


            <meta
                property='og:type'
                key='og_type'
                content={data.type}
                data-cy={OG_TYPE}
            />
            <meta
                property='og:title'
                key='og_title'
                content={title}
                data-cy={OG_TITLE}
            />
            <meta property='og:description'
                key='og_description'
                content={data.description}
                data-cy={OG_DESCRIPTION}
            />
            <meta
                property='og:url'
                key='og_URL'
                content={data.og_URL ?? data.canonical}
                data-cy={OG_URL}
            />
            <meta
                property='og:image'
                key='og_image' content={data.og_image ?? data.image}
                data-cy={OG_IMAGE}

            />
            <meta property='og:NEXT_PUBLIC_SITE_NAME'
                key='og_NEXT_PUBLIC_SITE_NAME'
                content={data.og_NEXT_PUBLIC_SITE_NAME ?? title}
                data-cy={OG_NEXT_PUBLIC_SITE_NAME}
            />

            <meta
                name='twitter:card'
                key='twitter_card'
                content='summary'
                data-cy={TWITTER_CARD}
            />
            <meta
                name='twitter:description'
                key='twitter_description'
                content={data.description}
                data-cy={TWITTER_DESCRIPTION}
            />
            <meta
                name='twitter:site'
                key='twitter_site'
                content={data.twitter_site ?? process.env.NEXT_PUBLIC_SITE_URL}
                data-cy={TWITTER_SITE}
            />
            <meta
                name='twitter:domain'
                key='twitter_domain'
                content={data.twitter_domain ?? data.canonical}
                data-cy={TWITTER_DOMAIN}
            />
            <meta
                name='twitter:image:src'
                key='twitter_img'
                content={data.image}
                data-cy={TWITTER_IMAGE}
            />

            <meta
                name='robots'
                key='robots'
                content={data.robots}
                data-cy={ROBOTS}
            />
            <link
                rel='canonical'
                key='canonical'
                href={data.canonical}
                data-cy={CANONICAL}
            />

        </Head>
    )
}
