import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";
import Button from "~/components/Button";
import CenteredCardWrapper from "~/components/CentredCardWrapper";
import Logo from "~/components/Logo";
import StoreSearch from "~/components/StoreSearch";

export default function SelectStores() {
  const router = useRouter();

  if (!router.isReady) {
    return <p className="">Loading...</p>;
  }

  if (router.isReady && !router.query.q) {
    return (
      <CenteredCardWrapper>
        <p>No search term</p>
        <Link href={`/discover/select-stores?q=${String(router.query.q)}`}>
          <Button>
            <div className="flex items-center justify-center gap-2">
              <ArrowLeftIcon className="h-4 w-4" />
              <span>Go back</span>
            </div>
          </Button>
        </Link>
      </CenteredCardWrapper>
    );
  }

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
      <Toaster />
      <div className="flex min-h-[100vh] animate-fade-in flex-col items-center justify-center">
        <Logo />
        <div className="mt-8 rounded-2xl bg-white p-12 text-black sm:w-[600px]">
          <h1 className="text-3xl font-semibold">
            Searching for{" "}
            <span className="text-indigo-500">
              &quot;{router.query.q}&quot;
            </span>
          </h1>
          <StoreSearch />
        </div>
      </div>
    </>
  );
}
