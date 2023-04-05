import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CheckboxWithLabel from "~/components/CheckboxWithLabel";
import FieldSet from "~/components/FieldSet";
import NavBar from "~/components/NavBar";
import { api } from "~/utils/api";

export default function Explore() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [stores, setStores] = useState<any[]>([]);
  const [selectedStores, setSelectedStores] = useState<any>({});

  const getProductsFromDomTree =
    api.products.getProductsFromDomTree.useMutation();

  useEffect(() => {
    if (router.isReady) {
      const doubleStringedArr = String(router.query.stores)
        ?.substring(1, String(router.query.stores).length - 1)
        .split(",");
      const newArr = doubleStringedArr.map((item) =>
        item.substring(1, item.length - 1)
      );
      setStores(newArr);
      setSelectedStores(() => {
        const obj: any = {};
        newArr.forEach((store) => {
          obj[store] = true;
        });
        return obj;
      });
    }
  }, [router]);

  useEffect(() => {
    if (stores.length > 0 && router.isReady) {
      const allProducts: any[] = [];
      stores.forEach(async (store) => {
        await getProductsFromDomTree
          .mutateAsync({
            hostname: store,
            searchTerm: router.query.q as string,
          })
          .then((res) => allProducts.push(res));
      });
      setProducts(allProducts);
      setFilteredProducts(allProducts);
    }
  }, [stores, router]);

  console.log("filteredProducts", filteredProducts);
  console.log("prods", products);

  useEffect(() => {
    if (Object.entries(selectedStores).length === 0 || products.length === 0) {
      return;
    }
    setFilteredProducts(() => {
      const newFilteredProducts: any[] = [];
      Object.entries(selectedStores).forEach((store) => {
        if (store[1]) {
          products.forEach((product) => {
            if (product[0].hostname === store[0]) {
              newFilteredProducts.push(product);
            }
          });
        }
      });
      return newFilteredProducts;
    });
  }, [selectedStores, products]);

  if (getProductsFromDomTree.isLoading) {
    return (
      <>
        <p>Loading...</p>
        <p>Visiting stores...</p>
        <p>Searching stores...</p>
        <p>Collecting product information...</p>
      </>
    );
  }

  if (getProductsFromDomTree.isError) {
    return <div>Error</div>;
  }

  if (router.isReady && !router.query.q) {
    return <p>No search term</p>;
  }

  return (
    <div className="bg-white">
      <NavBar />
      <h1 className="mt-8 text-center text-3xl font-medium text-black">
        Explore
      </h1>
      <div className="m-auto grid max-w-[1600px] grid-cols-12">
        <div className="col-span-2 p-12">
          <div className="sticky top-10">
            <h2 className="text-xl text-black ">Stores</h2>
            <FieldSet legend="stores">
              {stores.map((store) => {
                return (
                  <CheckboxWithLabel
                    key={store}
                    label={store}
                    name={store}
                    id={store}
                    state={selectedStores}
                    setState={setSelectedStores}
                  />
                );
              })}
            </FieldSet>
          </div>
        </div>
        <div className="col-span-10 m-auto grid grid-cols-1 gap-6 p-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((store) => {
            return store.map((product: Record<string, any>) => {
              return (
                <div
                  key={product.id}
                  className="flex flex-col items-center rounded-md bg-white p-4 text-black shadow"
                >
                  <div className="flex flex-1 items-center justify-center object-contain">
                    <a href={product.link}>
                      <Image
                        src={product.image}
                        alt={product.title}
                        width={product.imageWidth}
                        height={product.imageHeight}
                      />
                    </a>
                  </div>
                  <div>
                    <h1 className="text-lg font-bold">{product.title}</h1>
                    <h3>
                      {product.variants[0].price}{" "}
                      <span className="text-sm">(store currency)</span>
                    </h3>
                    <p className="text-sm">{product.hostname}</p>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
}
