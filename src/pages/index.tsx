import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import Logo from "~/components/Logo";
import StoreInputs from "~/components/StoreInputs";

const Home: NextPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("susb");
    router.push(
      "/search?q=" +
        JSON.stringify(
          Object.entries(searchTerm)
            .map((item) => {
              if (item[1] !== "") {
                return item[1];
              } else {
                return null;
              }
            })
            .filter((item) => item !== null)
        )
    );
  };

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
      <div className="min-h-[100vh] justify-between gap-2 bg-[#13121B] p-12">
        <div className="m-auto max-w-[1220px]">
          <Logo />
          <h1 className="mt-48 mb-8 text-6xl font-semibold text-white">
            Compare products <br />
            from your favourite stores
          </h1>
          <p className="text-white">ADD SEARCH INPUT HERE</p>
          <form onSubmit={handleSubmit}>
            <StoreInputs
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <button
              type="submit"
              className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-12 font-medium text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Home;
