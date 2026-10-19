import { Button } from "@/components/ui/button";
import CheckAvailabilityButton from "@/features/reservations/components/CheckAvailabilityButton";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-1 flex flex-col md:flex-row items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reservations</h1>

        <p className="text-sm text-muted-foreground">
          View and manage court reservations.
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <CheckAvailabilityButton />

        <Button
          className={"text-white flex items-center"}
          onClick={() => navigate("/reservations/schedule")}
        >
          <Plus />
          <span>Schedule Reservation</span>
        </Button>
      </div>
    </div>
  );
};

export default Header;
