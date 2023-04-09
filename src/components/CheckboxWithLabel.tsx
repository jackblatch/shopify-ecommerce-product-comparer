export default function CheckboxWithLabel({
  id,
  name,
  label,
  state,
  setState,
  ...delegated
}: {
  id: string;
  name: string;
  label: string;
  state: Record<string, boolean>;
  setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  [x: string]: unknown;
}) {
  return (
    <div className="space-y-5">
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={id}
            name={name}
            type="checkbox"
            checked={state[id]}
            onChange={(e) => {
              setState({ ...state, [id]: e.target.checked });
            }}
            className="h-4 w-4 rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
            {...delegated}
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={id} className="font-medium text-gray-900">
            {label}
          </label>
        </div>
      </div>
    </div>
  );
}
