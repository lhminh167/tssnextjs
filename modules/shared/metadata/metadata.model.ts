export enum PageType {
    Website = 'website',
    Article = 'article'
}

export enum RobotsContent {
    Follow = 'follow',
    Index = 'index',
    NoFollow = 'nofollow',
    NoIndex = 'noindex'
}

export interface Metadata {
    title: string;
    author?: string;
    description: string;
    type: PageType;
    og_type?: PageType;
    image: string;
    robots: string;
    // og_title?: string;
    // og_description?: string;
    og_URL?: string;
    canonical: string;
    og_image?: string;
    og_site_name?: string;
    twitter_card?: string;
    // twitter_description?: string;
    twitter_site?: string;
    twitter_domain?: string;
    twitter_img?: string;
};