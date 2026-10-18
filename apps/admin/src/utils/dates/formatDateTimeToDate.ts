export const formatDateTimeToDate = (dateTime: string) =>
  new Date(dateTime).toLocaleDateString("en-PH", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
