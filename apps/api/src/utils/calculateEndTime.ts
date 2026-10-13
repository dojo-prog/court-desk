export function calculateEndTime(startTime: string, duration: number): string {
  const [hours, minutes, seconds = 0] = startTime.split(":").map(Number);

  const totalSeconds = hours * 3600 + minutes * 60 + seconds + duration * 3600;

  const endHours = Math.floor(totalSeconds / 3600);
  const endMinutes = Math.floor((totalSeconds % 3600) / 60);
  const endSeconds = totalSeconds % 60;

  return [
    String(endHours).padStart(2, "0"),
    String(endMinutes).padStart(2, "0"),
    String(endSeconds).padStart(2, "0"),
  ].join(":");
}
