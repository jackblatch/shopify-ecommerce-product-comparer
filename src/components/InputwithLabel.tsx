import { PropsWithChildren } from "react";

export default function InputwithLabel({
  label,
  id,
  type,
  state,
  setState,
  placeholder,
  children,
}: PropsWithChildren<{
  label?: string;
  id: string;
  type: string;
  placeholder: string;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}>) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="block text-lg font-medium leading-6 text-black"
        >
          {label}
        </label>
      )}
      <div className="mt-2 flex w-full flex-col items-center justify-center gap-2 md:flex-row">
        <input
          type={type}
          placeholder={placeholder}
          name={id}
          id={id}
          className="block w-full flex-1 rounded-md border-0 py-2.5 px-3 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-lg sm:leading-6"
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          value={state[id]}
        />
        {children}
      </div>
    </div>
  );
}
