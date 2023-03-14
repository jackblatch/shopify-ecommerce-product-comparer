export default function InputwithLabel({
  label,
  id,
  type,
  state,
  setState,
}: {
  label: string;
  id: string;
  type: string;
  state: Record<string, string>;
  setState: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}) {
  return (
    <div>
      {/* <label htmlFor={id} className="block text-sm font-medium leading-6">
        {label}
      </label> */}
      <div className="mt-2 max-w-[500px]">
        <input
          type={type}
          placeholder={label}
          name={id}
          id={id}
          className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-800 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          onChange={(e) => setState({ ...state, [id]: e.target.value })}
          value={state[id]}
        />
      </div>
    </div>
  );
}
