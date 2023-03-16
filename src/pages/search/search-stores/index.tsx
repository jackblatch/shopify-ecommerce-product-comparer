import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function Explore() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);

  const getProductsFromDomTree =
    api.products.getProductsFromDomTree.useMutation();

  useEffect(() => {
    if (router.isReady) {
      const doubleStringedArr = String(router.query.q)
        ?.substring(1, String(router.query.q).length - 1)
        .split(",");
      const newArr = doubleStringedArr.map((item) =>
        item.substring(1, item.length - 1)
      );
      setStores(newArr);
    }
  }, [router]);

  useEffect(() => {
    if (stores.length > 0) {
      const allProducts: any[] = [];
      stores.forEach(async (store) => {
        await getProductsFromDomTree
          .mutateAsync({
            hostname: store,
            searchTerm: "wallet",
          })
          .then((res) => allProducts.push(res));
      });
      setProducts(allProducts);
    }
  }, [stores]);

  if (getProductsFromDomTree.isLoading) {
    return (
      <>
        <div>Loading...</div>
        <p>Visiting stores...</p>
        <p>Searching stores...</p>
        <p>Collecting product information...</p>
      </>
    );
  }

  if (getProductsFromDomTree.isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <h1>Explore</h1>
      <div></div>
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
