import { type PropsWithChildren } from "react";

export default function GradientButton({
  children,
  type,
  ...delegated
}: PropsWithChildren<{
  type?: "button" | "submit" | "reset";
  [x: string]: unknown;
}>) {
  return (
    <button
      type={type ?? "button"}
      className="flex min-w-full items-center justify-center gap-2 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-2 px-12 text-lg font-medium text-white disabled:opacity-60 md:w-fit"
      {...delegated}
    >
      {children}
    </button>
  );
}
