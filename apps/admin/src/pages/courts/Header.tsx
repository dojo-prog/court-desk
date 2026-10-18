import RegisterCourtButton from "@/features/courts/components/RegisterCourtButton";

const Header = () => {
  return (
    <div className="space-y-1 flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Courts</h1>

        <p className="text-sm text-muted-foreground">
          View and manage your registerd courts.
        </p>
      </div>

      <div>
        <RegisterCourtButton />
      </div>
    </div>
  );
};

export default Header;
