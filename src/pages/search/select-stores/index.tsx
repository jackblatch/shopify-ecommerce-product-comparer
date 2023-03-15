import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Logo from "~/components/Logo";
import StoreSearch from "~/components/StoreSearch";

export default function SelectStores() {
  const router = useRouter();

  if (!router.isReady) {
    return <p className="">Loading...</p>;
  }

  // if (router.isReady && !router.query.q) {
  //   router.push("/"); // // @TODO: This is causing hydration bug
  // }

  return (
    <>
      <Head>
        <title>Select Stores - ShopAround</title>
        <meta
          name="description"
          content="Compare products from your favourite stores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex min-h-[100vh] animate-fade-in flex-col items-center justify-center">
        <Logo />
        <div className="mt-8 rounded-2xl bg-white p-12 text-black sm:w-[600px]">
          <h1 className="text-3xl font-semibold">
            Searching for{" "}
            <span className="text-indigo-500">"{router.query.q}"</span>
          </h1>
          <StoreSearch />
        </div>
      </div>
    </>
  );
}
