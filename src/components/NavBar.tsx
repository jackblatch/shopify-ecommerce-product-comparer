import Link from "next/link";
import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="bg-darkPurple p-6">
      <div className="m-auto flex  max-w-[1600px] items-center">
        <Link href="/">
          <Logo />
        </Link>
      </div>
    </div>
  );
}
