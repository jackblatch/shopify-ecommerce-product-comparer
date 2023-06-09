import { MinusCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import InputwithLabel from "./InputwithLabel";

export default function StoreInputs({
  selectedStores,
  setSelectedStores,
  inputCount,
  setInputCount,
}: {
  selectedStores: Record<string, string>;
  setSelectedStores: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  inputCount: number;
  setInputCount: React.Dispatch<React.SetStateAction<number>>;
}) {
  return (
    <div className="text-white">
      <div className="flex flex-col gap-6">
        {Array.from(Array(inputCount)).map((_, i) => (
          <div className="relative" key={i}>
            <div className="flex-1">
              <InputwithLabel
                label={`Store ${i + 1}`}
                placeholder="Enter domain (e.g. example.com)"
                type="text"
                id={String(i + 1)}
                state={selectedStores}
                setState={setSelectedStores}
              />
            </div>
            {i > 0 && i + 1 === inputCount ? (
              <button
                className="absolute right-2 top-3"
                type="button"
                onClick={() => {
                  const newSelectedStores = { ...selectedStores };
                  newSelectedStores[i + 1] = "";
                  setInputCount((prev) => prev - 1);
                }}
              >
                <MinusCircleIcon className="mt-8 w-6 text-red-500" />
              </button>
            ) : null}
          </div>
        ))}
      </div>
      {inputCount < 4 && (
        <button
          type="button"
          onClick={() => setInputCount((prev) => prev + 1)}
          className="mt-6 flex w-full items-center justify-center rounded-md bg-[#272549] py-2"
        >
          <div className="rounded-full bg-gray-200 p-1 text-slate-900">
            <PlusIcon className="w-5 text-2xl font-bold" />
          </div>
        </button>
      )}
    </div>
  );
}
