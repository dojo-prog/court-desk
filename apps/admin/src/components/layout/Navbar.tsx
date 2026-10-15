import { ThemeToggler } from "../common/ThemeToggler";

const Navbar = () => {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div>
        <p className="text-sm font-medium">Court Desk Booking</p>
      </div>

      <ThemeToggler />
    </header>
  );
};

export default Navbar;
