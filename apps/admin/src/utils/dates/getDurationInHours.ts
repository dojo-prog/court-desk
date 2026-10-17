export const getDurationInHours = (startTime: string, endTime: string) => {
  const start = new Date(`1970-01-01T${startTime}`).getTime();
  const end = new Date(`1970-01-01T${endTime}`).getTime();

  return (end - start) / 3_600_000;
};
