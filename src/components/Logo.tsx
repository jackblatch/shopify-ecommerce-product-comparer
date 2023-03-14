import { ShoppingBagIcon } from "@heroicons/react/24/solid";

export default function Logo() {
  return (
    <div className="flex w-fit items-center justify-center gap-2 text-white">
      <h2 className="text-2xl font-medium">ShopAround</h2>
      <ShoppingBagIcon className="mb-[2px] h-6 w-6" />
    </div>
  );
}
