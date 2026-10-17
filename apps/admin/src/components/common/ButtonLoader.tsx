import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import type React from "react";

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  titleStyles?: string;
  loaderStyles?: string;
};

const ButtonLoader = ({ children, isLoading, loaderStyles }: Props) => {
  return (
    <>
      {!isLoading ? (
        children
      ) : (
        <Loader2 className={cn(`size-5 animate-spin`, loaderStyles)} />
      )}
    </>
  );
};

export default ButtonLoader;
