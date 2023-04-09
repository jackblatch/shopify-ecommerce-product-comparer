import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import GradientButton from "~/components/GradientButton";
import InputwithLabel from "~/components/InputwithLabel";
import Logo from "~/components/Logo";

const Home: NextPage = () => {
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    search: "",
  });

  return (
    <>
      <Head>
        <title>
          QuickShop - Compare products from your favourite online stores
        </title>
        <meta
          name="description"
          content="Compare products from your favourite online stores"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-[100vh] justify-between gap-2 bg-darkPurple px-4 py-12 sm:p-12">
        <div className="m-auto max-w-[1220px]">
          <div className="flex items-center justify-center sm:justify-start">
            <Logo />
          </div>
          <div className="mt-12 flex flex-col-reverse items-start justify-between gap-2 rounded-md bg-white p-6 sm:rounded-xl sm:p-12 md:flex-row md:rounded-3xl md:p-16">
            <div>
              <h1 className="text-4xl font-semibold text-black sm:text-6xl lg:text-7xl">
                Compare products <br />
                from <span className="text-indigo-500">
                  your favourite
                </span>{" "}
                <br /> online stores.
              </h1>
              <h2 className="text-md mt-6 max-w-[600px] text-black md:text-xl">
                Search, shop and explore your favourite stores in one place.
                Whether you&apos;re wanting to compare prices, or manage your
                shopping, QuickShop is the place!
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
                  <Link
                    href={`${
                      searchTerm.search !== ""
                        ? `/discover/select-stores?q=${String(
                            searchTerm.search
                          )}`
                        : "#"
                    }`}
                    className="w-full md:w-fit"
                  >
                    <GradientButton>
                      Next
                      <ArrowRightIcon className="w-4" />
                    </GradientButton>
                  </Link>
                </InputwithLabel>
                <p className="mt-2 text-sm text-gray-500">
                  Search for a product above to then enter your stores to search
                </p>
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
