import SearchInput from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import type { UserPublicEntity, UserQuery } from "@courtdesk/shared";
import { type Dispatch, type SetStateAction } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getInitials } from "@/utils/getInitals";
import { formatDateTimeToDate } from "@/utils/dates/formatDateTimeToDate";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { getUserRoleClassName } from "@/utils/variants/status/getUserRoleClassName";
import UpdateUserButton from "@/features/users/components/UpdateUserButton";

type Props = {
  users: UserPublicEntity[];
  isPending: boolean;
  isError: boolean;
  filters: UserQuery;
  setFilters: Dispatch<SetStateAction<UserQuery>>;
};

const UsersTable = ({
  users,
  isPending,
  isError,
  filters,
  setFilters,
}: Props) => {
  const columnCount = 4;

  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      {/* Table heading */}
      <div className="border-b px-5 py-4 space-y-4">
        <div className="flex flex-col gap-3  sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold tracking-tight">All users</h2>

            <p className="mt-1 text-sm text-muted-foreground">
              User profiles and their roles.
            </p>
          </div>

          <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
            {users.length} Users
          </Badge>
        </div>

        <SearchInput
          value={filters.search ?? ""}
          onChange={(value) =>
            setFilters((prev) => ({ ...prev, search: value }))
          }
          className="max-w-100"
          placeholder="Search user name or email..."
        />
      </div>

      {/* Table content */}
      <div
        className="max-h-[calc(100vh-26rem)] overflow-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/40 hover:bg-muted/40">
              <TableHead className="h-11 min-w-56 pl-5">User</TableHead>

              <TableHead className="min-w-30">Role</TableHead>

              <TableHead className="min-w-40">Registration Date</TableHead>

              <TableHead className="min-w-40 text-right pr-10">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {/* Loading state */}
            {isPending &&
              Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columnCount }).map((_, cellIndex) => (
                    <TableCell
                      key={cellIndex}
                      className={cellIndex === 0 ? "pl-5" : ""}
                    >
                      <div className="h-4 w-24 animate-pulse rounded bg-muted" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}

            {/* Error state */}
            {!isPending && isError && (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-36 text-center">
                  <p className="font-medium">Unable to load users</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Something went wrong while fetching users. Please try again.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* Empty state */}
            {!isPending && !isError && users.length === 0 && (
              <TableRow>
                <TableCell colSpan={columnCount} className="h-36 text-center">
                  <p className="font-medium">No users found</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    Registered users will appear here.
                  </p>
                </TableCell>
              </TableRow>
            )}

            {/* User rows */}
            {!isPending &&
              !isError &&
              users.map((user) => {
                const fullName = `${user.first_name} ${user.last_name}`;

                return (
                  <TableRow
                    key={user.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    {/* user name */}
                    <TableCell className="py-4 pl-5">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                          {getInitials(user.first_name, user.last_name)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium">{fullName}</p>

                          <p className="mt-0.5 truncate text-xs text-muted-foreground">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`rounded-full px-2.5 py-1 font-medium capitalize ${getUserRoleClassName(user.role)}`}
                      >
                        <span className="mr-1.5 inline-block size-1.5 rounded-full bg-current" />

                        {user.role}
                      </Badge>
                    </TableCell>

                    {/* Registration Date */}
                    <TableCell>
                      <span className="whitespace-nowrap text-xs">
                        {formatDateTimeToDate(user.created_at)}
                      </span>
                    </TableCell>

                    {/* Actions */}
                    <TableCell className="pr-10">
                      {user.first_name.toLowerCase() != "super" && (
                        <div className="flex items-center justify-end space-x-2">
                          <UpdateUserButton user={user} />
                          <Button variant={"destructive"}>
                            <TrashIcon />
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersTable;
