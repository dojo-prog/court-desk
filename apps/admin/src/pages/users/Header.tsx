import RegisterUserButton from "@/features/users/components/RegisterUserButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Users / Staff</h1>

        <p className="text-sm text-muted-foreground">
          View & manage users registered who have access to the system.
        </p>
      </div>

      <div>
        <RegisterUserButton />
      </div>
    </div>
  );
};

export default Header;
