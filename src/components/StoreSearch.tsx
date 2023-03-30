import { useRouter } from "next/router";
import { useState } from "react";
import GradientButton from "./GradientButton";
import StoreInputs from "./StoreInputs";

export default function StoreSearch() {
  const router = useRouter();
  const [selectedStores, setSelectedStores] = useState<Record<string, string>>({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("susb");
    router.push(
      "/discover/search?q=" +
        router.query.q +
        "&stores=" +
        JSON.stringify(
          Object.entries(selectedStores)
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
      <div className="w-full max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 border-b border-white pb-2">
            <h2 className="mt-2 text-lg">
              Enter the websites you'd like to search for this product below
            </h2>
          </div>
          <StoreInputs
            selectedStores={selectedStores}
            setSelectedStores={setSelectedStores}
          />
          <GradientButton
            type="submit"
            disabled={router.query.q ? false : true}
          >
            Search
          </GradientButton>
        </form>
      </div>
    </>
  );
}
