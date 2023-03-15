import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import InputwithLabel from "~/components/InputwithLabel";
import Logo from "~/components/Logo";
import StoreSearch from "~/components/StoreSearch";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    search: "",
  });

  return (
    <>
      <Head>
        <title>ShopAround</title>
        <meta
          name="description"
          content="Compare products from your favourite stores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[100vh] justify-between gap-2 bg-[#13121B] px-4 py-12 sm:p-12">
        <div className="m-auto max-w-[1220px]">
          <Logo />
          <div className="mt-12 flex flex-col-reverse items-start justify-between gap-2 rounded-3xl bg-white p-6 md:flex-row md:p-16">
            <div>
              <h1 className="text-4xl font-semibold text-black sm:text-6xl lg:text-7xl">
                Compare products <br />
                from <span className="text-indigo-500">
                  your favourite
                </span>{" "}
                <br /> online stores.
              </h1>
              <h2 className="mt-6 max-w-[600px] text-xl text-black">
                Search, shop and explore your favourite stores in one place.
                Whether you're wanting to compare prices, or manage your
                shopping, ShopAround is the place!
              </h2>
              <div className="mt-6 w-full">
                <label className="sr-only" htmlFor="search">
                  Enter product to search for
                </label>
                <InputwithLabel
                  type="text"
                  placeholder="Enter product to search for..."
                  id="search"
                  state={searchTerm}
                  setState={setSearchTerm}
                >
                  <button className="flex w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-12 text-lg font-medium text-white md:w-fit">
                    Next
                    <ArrowRightIcon className="w-4" />
                  </button>
                </InputwithLabel>
                <p className="mt-2 text-sm text-gray-500">
                  Search for a product above to then enter your stores to search
                </p>
              </div>
            </div>
            <div>IMAGE</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
