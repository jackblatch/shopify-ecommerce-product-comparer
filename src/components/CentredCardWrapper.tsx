import { PropsWithChildren } from "react";

export default function CenteredCardWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <div className="prose rounded-md bg-white p-6 md:p-12">{children}</div>
    </div>
  );
}
