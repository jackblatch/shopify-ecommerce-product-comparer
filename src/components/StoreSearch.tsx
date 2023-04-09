import { useRouter } from "next/router";
import { useState } from "react";
import GradientButton from "./GradientButton";
import StoreInputs from "./StoreInputs";
import { z } from "zod";
import { toast } from "react-hot-toast";

export default function StoreSearch() {
  const router = useRouter();
  const [inputCount, setInputCount] = useState(2);
  const [selectedStores, setSelectedStores] = useState<Record<string, string>>({
    1: "",
    2: "",
    3: "",
    4: "",
  });

  const isURL = z.string().url();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const stores = Object.values(selectedStores);
    stores.splice(1);
    const filteredStores = stores.filter((item) => item !== "");
    let validURLs = true;

    filteredStores.map((url) => {
      try {
        if (url === "" || !isURL.parse("https://" + url)) {
          throw new Error("Invalid URL");
        }
      } catch (err) {
        validURLs = false;
      }
    });

    if (!validURLs || filteredStores.length === 0) {
      toast.error("One of more entries has an invalid URL", {
        position: "bottom-center",
      });
      return;
    }

    const changePage = async () => {
      await router.push(
        "/discover/search?q=" +
          String(router.query.q) +
          "&stores=" +
          JSON.stringify(
            Object.entries(selectedStores)
              .map((item) => {
                if (item[1] !== "") {
                  const WWWPrefix = /^www\./i;
                  return item[1].replace(WWWPrefix, "");
                } else {
                  return null;
                }
              })
              .filter((item) => item !== null)
          )
      );
    };
    changePage() as unknown as void;
  };

  return (
    <div className="w-full max-w-[500px]">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 border-b border-white pb-2">
          <h2 className="mt-2 text-lg">
            Enter the websites you&apos;d like to search for this product below.
          </h2>
        </div>
        <StoreInputs
          inputCount={inputCount}
          setInputCount={setInputCount}
          selectedStores={selectedStores}
          setSelectedStores={setSelectedStores}
        />
        <div className="mt-6">
          <GradientButton
            type="submit"
            disabled={
              !router.query.q || Object.values(selectedStores)[0] === ""
                ? true
                : false
            }
          >
            Search
          </GradientButton>
        </div>
      </form>
    </div>
  );
}
