import { type PropsWithChildren } from "react";

export default function Button({
  children,
  onClick,
}: PropsWithChildren<{ onClick?: () => void }>) {
  return (
    <button
      className="rounded-md border border-gray-200 bg-purple-900 py-2 px-6 text-white"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
