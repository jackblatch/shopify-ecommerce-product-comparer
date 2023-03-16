import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function Explore() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getProductsFromDomTree =
    api.products.getProductsFromDomTree.useMutation();

  // useEffect(() => {
  //   if (router.isReady) {
  //     setStores(
  //       String(router.query.q)
  //         ?.substring(1, String(router.query.q).length - 1)
  //         .split(",")
  //     );
  //   }
  // }, [router]);

  useEffect(() => {
    if (stores.length === 0) {
      const allProducts: any[] = [];
      ["pipermagic.com.au", "globalmagicshop.com.au"].forEach(async (store) => {
        await getProductsFromDomTree
          .mutateAsync({
            hostname: store,
            searchTerm: "wallet",
          })
          .then((res) => allProducts.push(res));
        // allProducts.push(data);
      });
      setProducts(allProducts);
      setLoading(false);
    }
  }, [stores]);

  console.log({ products });

  console.log("ARR", [
    String(router.query.q)
      ?.substring(1, String(router.query.q).length - 1)
      .split(","),
  ]);

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

  // useEffect(() => {
  //   if (router.isReady && !getProductsFromDomTree.data) {
  //     // GET DATA
  //   }
  // }, [router]);

  console.log(getProductsFromDomTree);

  if (getProductsFromDomTree.isLoading) {
    return <div>Loading...</div>;
  }

  // @TODO show error message if error is true

  return (
    <>
      <h1>Explore</h1>
      <div className="grid grid-cols-5 gap-2">
        {products.map((store) => {
          return store.map((product: Record<string, any>) => {
            return (
              <div key={product.id}>
                <img
                  src={product.image}
                  alt={product.title}
                  width={product.imageWidth}
                  height={product.imageHeight}
                />
                <h1>{product.title}</h1>
              </div>
            );
          });
        })}
      </div>
    </>
  );
}
