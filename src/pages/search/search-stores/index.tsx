import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function Explore() {
  const router = useRouter();
  const [products, setProducts] = useState<Record<string, any>>({});

  const getProductsFromDomTree = api.products.getProductsFromDomTree.useQuery(
    {
      hostname: (router.query.q as string) ?? "",
      searchTerm: "wallet",
    },
    {
      refetchOnWindowFocus: false,
    }
  );

  // @TODO: Use SAME query function in TRPC for each store, but with different hostname (may need to change to mutation instead).
  // Just passa string into each request

  // @TODO: Show live loading animation of each store - e.g.
  // stacked blocks loading each store, show success when one completed and black out and go to next.
  // If store failed, show failed message and progress to next one

  // OLD -------------------------------------------
  // @TODO: Loop through stores provided in query param in backend and return results one at a time for each one.
  // Split into multiple requests, so if one fails, the others can still be returned.
  // Need to reuse same query function in TRPC for each one?
  // Domain.com above needs to be changed to the router.query params value

  console.log(router.query);

  // useEffect(() => {
  //   if (router.isReady && !getProductsFromDomTree.data) {
  //     // GET DATA
  //   }
  // }, [router]);

  console.log(getProductsFromDomTree.data);

  if (getProductsFromDomTree.isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <h1>Explore</h1>
      <div className="grid grid-cols-5 gap-2">
        {getProductsFromDomTree.data?.map((product) => {
          if (!product) return "";
          return (
            <div key={product.id}>
              <Image
                src={product.image}
                alt={product.alt ?? product.title}
                width={product.imageWidth}
                height={product.imageHeight}
              />
              <h1>{product.title}</h1>
            </div>
          );
        })}
      </div>
    </>
  );
}
