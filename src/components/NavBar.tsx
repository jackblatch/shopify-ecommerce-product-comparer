import Logo from "./Logo";

export default function NavBar() {
  return (
    <div className="bg-darkPurple p-6">
      <div className="m-auto flex max-w-[1220px] items-center">
        <Logo />
      </div>
    </div>
  );
}
