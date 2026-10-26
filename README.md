# eShopMate — T-Shirt Shop

**A full-stack storefront built with Next.js, React, TypeScript, and a .NET Core API.**

Browse a curated T-shirt catalog, discover products through search and filters, manage a cart or wishlist, and complete a multi-step checkout. The application also includes customer accounts, product reviews, order history, and administration workflows.

**Live storefront:** [tssnextjs.vercel.app](https://tssnextjs.vercel.app/)  
**Backend API:** [tssnetcore.vercel.app](https://tssnetcore.vercel.app/)  
**Release notes:** [v1.0.0](https://github.com/lhminh167/tssnextjs/releases#release-v1.0.0)

## Product highlights

- **Curated storefront:** homepage sections for featured, discounted, best-selling, top-rated, and newest products.
- **Catalog discovery:** browse departments and categories, search and filter products, and view product details, recommendations, and customer reviews.
- **Shopping journeys:** maintain a shopping cart or wishlist and follow a multi-step order flow with delivery and Stripe-powered card payment forms.
- **Customer accounts:** register, sign in, view and edit account details, change passwords, and recover access with password-reset links.
- **Store operations:** interfaces for managing products, customers, orders, and departments.
- **Search and sharing:** page metadata, structured data, and a generated sitemap support search-engine discovery and social previews.
- **Resilient experience:** offline caching via a service worker, shared loading and error states, and responsive desktop/mobile navigation.

## Technology

| Area | Tools |
| --- | --- |
| Application | Next.js 9 Pages Router, React, TypeScript |
| UI | Material-UI |
| State and async flows | Redux Toolkit, Redux Saga |
| Payments | Stripe Elements |
| Media | Cloudinary |
| Testing | Cypress, Percy, NYC coverage |
| Deployment | Vercel |

## Getting started

### Requirements

- Node.js `22.x` (the version declared in `package.json`)
- npm
- A running [TSS .NET backend](https://github.com/lhminh167/tssnetcore) and its required services

### Install and run

```bash
npm install
```

Create `.env.local` from the example template:

```powershell
Copy-Item example.env .env.local
```

```bash
cp example.env .env.local
```

Update `.env.local` with the URLs and public integration settings for your environment. Then start the development server:

```bash
npm run dev
```

The storefront is served at [http://localhost:5009](http://localhost:5009).

### Environment variables

| Variable | Purpose |
| --- | --- |
| `API_URL` | Backend API base URL, including `/api/` and a trailing slash |
| `STRIPE_API_KEY` | Stripe publishable key used by the client checkout |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud used for product media |
| `CLOUDINARY_API_KEY` | Cloudinary API key used by the configured media features |
| `SITE_URL` | Canonical storefront URL for metadata and sitemap generation |
| `SITE_NAME` | Store name used in site metadata |
| `PERCY_TOKEN` | Optional; required when running Percy visual tests |

Keep `.env.local` local. Never commit secret keys or production credentials. The checked-in `example.env` is a template; replace its example values with the values for your own backend and integrations.

## Useful commands

```bash
npm run dev                 # Start Next.js on port 5009
npm run build               # Create a production build
npm start                   # Serve the production build using $PORT
npm run dev:test            # Open Cypress
npm run test:priority:2     # Run the priority-2 Cypress suite
npm run analyze             # Build with the bundle analyzer enabled
```

The visual and priority-1 suites run through Percy and require a valid `PERCY_TOKEN`. Cypress integration tests expect the configured backend and test data to be available.

## Project structure

The application is organized around Next.js routes and feature-focused modules. A page composes feature components; modules keep UI, API services, state, and domain models close to the feature that uses them.

```text
pages/       Next.js routes and the sitemap API route
modules/     Storefront, account, commerce, and shared feature modules
public/      Static assets served directly by Next.js
cypress/     Component and end-to-end tests, fixtures, and test helpers
```

### `pages/` — routes and page composition

Next.js Pages Router entry points map URLs to feature modules:

- `index.tsx` renders the product-led homepage.
- `product/` and `category/` provide catalog, detail, and product-management routes.
- `user/` contains account, registration, login, and password recovery routes.
- `shopping-cart.tsx` and `wish-list.tsx` expose cart and saved-item pages.
- `order/` contains checkout and order-detail routes.
- `admin.tsx` and `department.tsx` expose administrative and department views.
- `api/sitemap.ts` generates the sitemap endpoint.
- `_app.tsx` wires the Redux store, shared layout, and application-level error boundary; `_document.tsx` customizes the document shell.

### `modules/` — feature implementation

Each feature module groups its components and, where applicable, services, models, state slices, sagas, and metadata.

| Folder | Responsibility |
| --- | --- |
| `admin/` | Administration views and customer-management list UI |
| `category/` | Category details and the products within a category |
| `customer/` | Registration, login, account details and edits, customer lists, password changes, and forgot/reset-password flows |
| `department/` | Department browsing and list UI |
| `order/` | Order history and details; order creation, delivery, payment, confirmation, and completion steps |
| `product/` | Homepage galleries, catalog filtering, product details and CRUD, recommendations, and product reviews |
| `root/` | Root Redux reducer, saga, and store setup shared across the application |
| `shared/` | Reusable UI, API helpers, models, validation, authorization checks, navigation, metadata, loading, and error handling |
| `shopping-cart/` | Cart details and quantity controls, wishlist, and cart recommendations |

Feature folders inside `modules/`:

| Feature area | Subfolders and responsibilities |
| --- | --- |
| `admin/` | `list/` — administrative customer list |
| `category/` | `list/` — category browsing; `detail/` and `detail/product-list/` — category pages and their products |
| `customer/` | `create/`, `login/`, `list/`, `detail/`, `edit/`, `index/` — account registration and views; `change-password/`, `forgot-password/`, `reset-password/` — credential recovery and updates |
| `department/` | `list/` — department browsing |
| `order/` | `create/` — checkout flow; `create/delivery-form/`, `payment-form/`, `confirmation-form/`, `finish-form/` — checkout stages; `detail/`, `list/` — order views and history |
| `product/` | `filter/` — search/filter state and API; `detail/`, `create/`, `edit/` — product pages and management; `review/` — review create, detail, edit, and delete; `recommendation/`, `best-selling/`, `most-discounted/`, `newest/`, `top-rated/`, `top-panel/` — discovery galleries |
| `shopping-cart/` | `detail/` — cart page; `quantity-picker/` — cart quantity controls; `recommendation/` — related product suggestions; `wish-list/` — saved products |

`modules/shared/` groups reusable presentation and infrastructure: `layout/`, `navbar/`, `footer/`, and `sidebar/` provide the site shell; `product-card/`, `product-list/`, `product-carousel/`, `product-horizontal-gallery/`, `gallery-header/`, `brand/`, `brand-picker/`, `color-picker/`, and `size-picker/` support catalog UI; `search/`, `pagination/`, and `quantity-picker/` provide common controls; `crud/`, `services/`, `models/`, and `helpers/` hold shared API and domain utilities; `allow/` and `validator/` handle authorization-aware UI and validation; `loader/`, `skeleton/`, `error-boundary/`, `notifier/`, `confirmation-dialog/`, `success/`, and `action-buttons/` provide feedback and interaction patterns; `image/`, `upload/`, and `svg/` handle media; `metadata/`, `structured-data/`, and `sitemap/` support discoverability; `tag/` contains shared tag definitions.

### `cypress/` — quality and regression coverage

- `integration/` exercises user journeys across catalog, accounts, cart, wishlist, checkout, orders, administration, and sitemap routes.
- `component/` contains focused component tests.
- `helpers/` provides feature-oriented test builders and reusable assertions.
- `fixtures/` stores test data; `plugins/` and `support/` configure Cypress behavior and commands.

### `public/` — static assets

Contains static images, icons, and other files referenced directly by the storefront. Assets are served from the site root rather than bundled through a page route.

## Architecture notes

- Homepage product data is statically generated and revalidated, keeping frequently visited catalog content fast while allowing it to refresh.
- Redux Toolkit stores shared customer, product-filter, and cart-count state; Redux Saga coordinates the related asynchronous flows.
- The Next.js configuration generates a service worker and uses network-first caching for HTTP resources.
- The frontend and backend deploy independently; configure `API_URL` to point to the matching backend environment.

## Release

The [v1.0.0 release](https://github.com/lhminh167/tssnextjs/releases#release-v1.0.0) introduced key storefront capabilities including order processing, recommendations, SEO metadata, customer account management, and password recovery. The current codebase also contains the catalog, cart, wishlist, reviews, and administrative areas described above.
