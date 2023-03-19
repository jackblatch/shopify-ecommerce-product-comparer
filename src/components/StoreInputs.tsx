import { MinusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import InputwithLabel from "./InputwithLabel";

export default function StoreInputs({
  selectedStores,
  setSelectedStores,
}: {
  selectedStores: Record<string, string>;
  setSelectedStores: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
}) {
  const [inputCount, setInputCount] = useState(2);

  return (
    <div className="text-white">
      <div className="flex flex-col gap-6">
        {Array.from(Array(inputCount)).map((_, i) => (
          // @TODO wrap in component with children to allow minus buttons and inability to remove last element
          <div className="flex items-center justify-center gap-2" key={i}>
            <div className="flex-1">
              <InputwithLabel
                label={`Store ${i + 1}`}
                placeholder="Enter domain..."
                type="text"
                id={String(i + 1)}
                state={selectedStores}
                setState={setSelectedStores}
              />
            </div>
            <button
              type="button"
              onClick={() => {
                const newSelectedStores = { ...selectedStores };
              }}
            >
              <MinusCircleIcon className="mt-8 w-6 text-red-500" />
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => {
          inputCount < 6
            ? setInputCount((prev) => prev + 1)
            : toast.error(
                "You can only add up to 6 stores in a single search",
                {
                  position: "bottom-right",
                }
              );
        }}
        className="my-6 flex w-full items-center justify-center rounded-md bg-[#272549] py-2"
      >
        <div className="rounded-full bg-gray-200 p-1 text-slate-900">
          <PlusIcon className="w-5 text-2xl font-bold" />
        </div>
      </button>
    </div>
  );
}
