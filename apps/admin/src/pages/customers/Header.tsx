import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <Button className={"text-white flex items-center"}>
          <Plus />
          <span>Register Customer</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
