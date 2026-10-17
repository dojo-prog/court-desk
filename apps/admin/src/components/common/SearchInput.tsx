import { Search, X, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SearchInputProps extends Omit<
  React.ComponentProps<"input">,
  "onChange"
> {
  value: string;
  onChange: (value: string) => void;
  isLoading?: boolean;
  onClear?: () => void;
  wrapperClassName?: string;
}

const SearchInput = ({
  value,
  onChange,
  isLoading = false,
  onClear,
  wrapperClassName,
  className,
  ...props
}: SearchInputProps) => {
  const handleClear = () => {
    onClear?.();
    if (!onClear) {
      onChange("");
    }
  };

  return (
    <div className={cn("relative w-full", wrapperClassName)}>
      {isLoading ? (
        <Loader2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 animate-spin text-muted-foreground" />
      ) : (
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      )}

      <Input
        {...props}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className={cn("h-10 pl-9 pr-9", className)}
      />

      {value && (
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="absolute right-1 top-1/2 size-8 -translate-y-1/2"
          aria-label="Clear search"
        >
          <X className="size-4" />
        </Button>
      )}
    </div>
  );
};

export default SearchInput;
