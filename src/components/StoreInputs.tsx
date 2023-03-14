import { PlusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import InputwithLabel from "./InputwithLabel";

export default function StoreInputs({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: Record<string, string>;
  setSearchTerm: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  const [inputCount, setInputCount] = useState(2);

  return (
    <div className="text-white">
      <p>Enter the domain names below</p>
      <div className="flex flex-col gap-6">
        {Array.from(Array(inputCount)).map((_, i) => (
          // @TODO wrap in component with children to allow minus buttons and inability to remove last element
          <InputwithLabel
            key={i}
            label={`Store ${i}`}
            type="text"
            id={String(i + 1)}
            state={searchTerm}
            setState={setSearchTerm}
          />
        ))}
      </div>
      <button className="my-6 flex w-full max-w-[500px] items-center justify-center rounded-md bg-[#272549] py-2">
        <div className="rounded-full bg-slate-900 p-1">
          <PlusIcon className="w-5 text-2xl font-bold" />
        </div>
      </button>
    </div>
  );
}
