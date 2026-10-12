import { AppError } from "./errors/AppError";

const generateChanges = <T extends object>(
  original: T,
  modified: Partial<T>,
  throwOnNoChanges = true,
): Partial<T> => {
  const changes: Partial<T> = {};

  for (const key of Object.keys(modified) as Array<keyof T>) {
    const value = modified[key];

    if (value === undefined) continue;

    if (original[key] !== value) {
      changes[key] = value;
    }
  }

  if (throwOnNoChanges && Object.keys(changes).length === 0) {
    throw new AppError(400, "No changes have been made");
  }

  return changes;
};

export default generateChanges;
