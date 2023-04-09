import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import puppeteer from "puppeteer";
import { hostname } from "os";
import { exploreResponseMockData } from "~/exploreResponseMockData";

export const productsRouter = createTRPCRouter({
  mockData: publicProcedure
    .input(
      z.object({
        hostname: z.string().nullish(),
        searchTerm: z.string(),
      })
    )
    .mutation(async () => {
      return exploreResponseMockData;
    }),
  getProductsFromDomTree: publicProcedure
    .input(
      z.object({
        hostname: z.string().url().nullish(),
        searchTerm: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      if (!input?.hostname) return [];
      console.log({ hostname });
      // @TODO handle currency - set cart_currency cookie to USD for all requests or get currency from site
      const getProducts = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
          `${input.hostname}/search?q=${input.searchTerm}&type=product&options%5Bprefix%5D=last&limit=24`
        );

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        const products = await page.evaluate(() => {
          const cache: Record<string, boolean> = {};
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
          let productsArr = getData("?_pos=");

          if (
            productsArr.filter((item) => item === null).length ===
            productsArr.length
          ) {
            productsArr = getData("?variant=");
          } else {
            return productsArr;
          }

          if (
            productsArr.filter((item) => item === null).length ===
            productsArr.length
          ) {
            return getData("product");
          } else {
            return productsArr;
          }
        });

        await browser.close();

        const allProducts = products.map(async (item) => {
          const WWWPrefix = /^www\./i;
          if (!item) return null;
          const link = item.link.split("?")[0];
          const productJSONLink = `${link}.json`;
          const data = await fetch(productJSONLink);
          const json = await data.json();
          return {
            id: json.product.id,
            hostname: item.hostname.replace(WWWPrefix, ""),
            link: item.link + "?ref=quickshop",
            handle: json.product.handle,
            title: json.product.title,
            image: json.product.image?.src,
            imageHeight: json.product.image?.height,
            imageWidth: json.product.image?.width,
            alt: json.product.image?.alt,
            variants: json.product.variants.map((variant: any) => ({
              id: variant.id,
              sku: variant?.sku,
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
        .catch((err) => {
          console.log("ERROR", err);
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        });
    }),
});
