import Head from 'next/head';
import { CANONICAL, DESCRIPTION_META_TAG, OG_DESCRIPTION, OG_IMAGE, OG_SITE_NAME, OG_TITLE, OG_TYPE, OG_URL, ROBOTS, TITLE_META_TAG, TWITTER_CARD, TWITTER_DESCRIPTION, TWITTER_DOMAIN, TWITTER_IMAGE, TWITTER_SITE } from '../tag/tag.model';
import { Metadata } from './metadata.model';

export interface Props {
    data: Metadata;
}

export function MetadataComponent({
    data
}: Props) {
    const title = data.shouldPrefixSiteName ?
        process.env.SITE_NAME + ' | ' + data.title :
        data.title + ' | ' + process.env.SITE_NAME;

    return (
        <Head>
            <title
                key='title'
                data-cy={TITLE_META_TAG}
            >
                {title}
            </title>
            <meta
                name='description'
                key='description'
                content={data.description}
                data-cy={DESCRIPTION_META_TAG}
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
            <meta property='og:site_name'
                key='og_site_name'
                content={data.og_site_name ?? title}
                data-cy={OG_SITE_NAME}
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
                content={data.twitter_site ?? process.env.SITE_URL}
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
