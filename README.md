# Ecommerce Product Comparer

Ecommerce product comparision website allowing users to compare products from different stores.

![Home Page Screenshot](/public/home-page-screenshot.png?raw=0)

## Features

- Multi-step form allowing the user to enter a product name as their search query and then enter up to 4 stores to search.
- The sites entered are then scraped for products matching the search term, displaying a list of products to the user.
- Users are then able to click on products to view them on the original store's website as well as filter which store's products to display on the page.

## Technologies used

- Next.js
- tRPC
- TailwindCSS
- Puppeteer (web scraping)

## Data Fetching

When users enter a search term and select stores to search, the app will fetch product data from the stores entered. This is done by scraping the store's search page for products matching the search term, only selecting elements that contain either `product`, `?_pos=` or `?variant=` (common segments/query params for Shopify stores) in the `href` attribute to ensure only products part of the search are returned (without this, the scraper could return products that are featured on the store in global elements that aren't directly related to the search term).

To reduce the additional overhead caused by subsequently scraping data from each product's individual product detail page, the app makes use of Shopify's product json data to quickly obtain the relevant product data by appending `.json` to the end of product page links.

Due to how the process of fetching product data works, the app has been developed with certain assumptions. While this caters towards a wide variety of ecommerce stores, this causes the following limitations on the stores that can be searched:

1. The store must be a Shopify store.
2. The store must be accessible to the public (e.g. not password protected).
3. The store's search page must be accessible at /search.
4. The store's search results page must list products with links containing either `product`, `?_pos=` or `?variant=`.

## Running the App

1. Install packages through npm `npm install`
2. Run the app in development mode `npm run dev`
