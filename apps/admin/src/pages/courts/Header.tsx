import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

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
        <Button className={"text-white flex items-center"}>
          <Plus />
          <span>Register Court</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
