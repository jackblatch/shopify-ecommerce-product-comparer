import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import puppeteer from "puppeteer";

export const productsRouter = createTRPCRouter({
  getProductsFromDomTree: publicProcedure
    .input(z.object({ hostname: z.string(), searchTerm: z.string() }))
    .query(async ({ input }) => {
      // @TODO handle currency - set cart_currency cookie to USD for all requests or get currency from site
      const getProducts = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
          `https://${input.hostname}/search?type=product&options%5Bprefix%5D=last&q=${input.searchTerm}&limit=24`
        );

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        const products = await page.evaluate(() => {
          const cache: Record<string, any> = {};
          const getData = (searchterm: string) => {
            return Array.from(document.getElementsByTagName("a")).map(
              (product) => {
                if (product.href.includes(searchterm) && !cache[product.href]) {
                  cache[product.href] = true;
                  return {
                    link: product.href,
                    hostname: product.hostname,
                  };
                } else {
                  return null;
                }
              }
            );
          };
          const productsArr = getData("?_pos=");
          console.log("LENGTH", productsArr);
          if (productsArr.length === 0) {
            console.log("RUNNING VARIANT SEARCH");
            return getData("?variant=");
          } else {
            return productsArr;
          }
        });

        // let products = await getProducts("?_pos=");

        // if (products.length === 0) {
        // WIP: need to re-run above function with ?variant= string for includes instead
        // example: needs to be done to support older shopify stores e.g. PM site
        // then as a third fallback, get all urls with 'products' in URL. Implement max results.
        // need to run before map below runs. map should only run on successful completion
        // }

        await browser.close();

        const allProducts = products.map(async (item) => {
          if (!item) return null;
          const link = item.link.split("?")[0];
          const productJSONLink = `${link}.json`;
          const data = await fetch(productJSONLink);
          const json = await data.json();
          return {
            id: json.product.id,
            hostname: item.hostname,
            link: item.link,
            handle: json.product.handle,
            title: json.product.title,
            image: json.product.image.src,
            imageHeight: json.product.image.height,
            imageWidth: json.product.image.width,
            alt: json.product.image.alt,
            variants: json.product.variants.map((variant: any) => ({
              id: variant.id,
              sku: variant.sku,
              title: variant.title,
              price: variant.price,
            })),
          };
        });
        return Promise.all(allProducts).then((res) =>
          res.filter((item) => item)
        );
      };

      return getProducts()
        .then((res) => res)
        .catch(() => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        });
    }),
});
