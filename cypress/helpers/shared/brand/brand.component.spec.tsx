
export default function cyGetSiteName() {
    return (Cypress.env('SITE_NAME') as string).toUpperCase();
}

