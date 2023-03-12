import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import puppeteer from "puppeteer";

export const productsRouter = createTRPCRouter({
  getProducts: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // @TODO handle currency - set cart_currency cookie to USD for all requests or get currency from site
      const getProducts = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
          "https://globalmagicshop.com.au/search?type=product&options%5Bprefix%5D=last&q=bicycle"
        );

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        // @TODO consider going up a selector to get product wrapper so we can get the price, image, etc
        const products = await page.evaluate(() => {
          return Array.from(
            document.querySelectorAll(".ProductItem__Title > a")
          ).map((product) =>
            JSON.stringify({
              name: product.textContent,
              link: product.getAttribute("href"),
            })
          );
        });

        console.log("PRODUCTS", products.join("\r\n"));
        await browser.close();
        return products;
      };

      return getProducts()
        .then((res) => res)
        .catch(() => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        });
    }),
  getProductsFromDomTree: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      // @TODO handle currency - set cart_currency cookie to USD for all requests or get currency from site
      const getProducts = async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.goto(
          "https://globalmagicshop.com.au/search?type=product&options%5Bprefix%5D=last&q=bicycle"
        );

        // Set screen size
        await page.setViewport({ width: 1080, height: 1024 });

        // @TODO consider going up a selector to get product wrapper so we can get the price, image, etc
        const products = await page.evaluate(() => {
          return Array.from(document.getElementsByTagName("a")).map(
            (product) => {
              if (product.href.includes("?_pos=")) {
                return {
                  link: product.href,
                  hostname: product.hostname,
                };
              } else {
                return { link: null, hostname: null };
              }
            }
          );
        });
        await browser.close();

        const cache: any = {};
        return Promise.all(
          products.map(async (item) => {
            if (!item.link || !item.hostname || cache[item.link]) return null;
            const link = item.link.split("?")[0];
            const productJSONLink = `${link}.json`;
            //   return { name: "hello!" };
            const data = await fetch(productJSONLink);
            const json = await data.json();
            cache[item.link] = true;
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
          })
        );
      };

      return getProducts()
        .then((res) => res)
        .catch(() => {
          throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
        });
    }),
});
