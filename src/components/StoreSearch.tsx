import { useRouter } from "next/router";
import { useState } from "react";
import StoreInputs from "./StoreInputs";

export default function StoreSearch() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState<Record<string, string>>({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
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
      <div className="w-full max-w-[500px] text-white">
        <h3>SS</h3>
        {/* <p className="text-white">ADD SEARCH INPUT HERE</p> */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4 border-b border-white pb-2 text-white">
            <h3 className="text-lg uppercase ">Stores to Search</h3>
            <p>Enter the domain names below</p>
          </div>
          <StoreInputs searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <button
            type="submit"
            className="rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-12 font-medium text-white"
          >
            Search
          </button>
        </form>
      </div>
    </>
  );
}
