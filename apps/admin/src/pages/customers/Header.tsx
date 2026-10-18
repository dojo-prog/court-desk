import RegisterCustomerButton from "@/features/customers/components/RegisterCustomerButton";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>

        <p className="text-sm text-muted-foreground">
          View customer information and track their reservations.
        </p>
      </div>

      <div>
        <RegisterCustomerButton />
      </div>
    </div>
  );
};

export default Header;
