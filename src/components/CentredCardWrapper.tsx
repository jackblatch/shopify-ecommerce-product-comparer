import { type PropsWithChildren } from "react";

export default function CenteredCardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 p-6">
      <div className="prose rounded-md border-2 border-gray-400 bg-white p-6 md:p-12 ">
        {children}
      </div>
    </div>
  );
}
