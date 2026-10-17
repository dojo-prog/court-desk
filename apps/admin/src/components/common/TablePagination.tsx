import type { Dispatch, SetStateAction } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Filters = {
  page: number;
  limit: number;
  [key: string]: unknown;
};

type Props = {
  page: number;
  totalPages: number;
  setFilters: Dispatch<SetStateAction<Filters>>;
};

const TablePagination = ({ page, totalPages, setFilters }: Props) => {
  return (
    <div className="flex flex-col gap-3 border-t px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-muted-foreground">
        Page <span className="font-medium text-foreground">{page}</span> of{" "}
        <span className="font-medium text-foreground">{totalPages}</span>
      </p>

      <Pagination className="mx-0 w-auto justify-start sm:justify-end">
        <PaginationContent>
          {/* Previous page */}
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (page > 1) {
                  setFilters((current) => ({
                    ...current,
                    page: current.page - 1,
                  }));
                }
              }}
              aria-disabled={page <= 1}
              className={page <= 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {/* Page numbers */}
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (pageNumber) => (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href="#"
                  isActive={pageNumber === page}
                  onClick={(event) => {
                    event.preventDefault();

                    setFilters((current) => ({
                      ...current,
                      page: pageNumber,
                    }));
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            ),
          )}

          {/* Next page */}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(event) => {
                event.preventDefault();

                if (page < totalPages) {
                  setFilters((current) => ({
                    ...current,
                    page: current.page + 1,
                  }));
                }
              }}
              aria-disabled={page >= totalPages}
              className={
                page >= totalPages ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TablePagination;
