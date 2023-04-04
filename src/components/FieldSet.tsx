import { PropsWithChildren } from "react";

export default function FieldSet({
  children,
  legend,
}: PropsWithChildren<{ legend: string }>) {
  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      {children}
    </fieldset>
  );
}
