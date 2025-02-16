export const isLock = (totalHour: number) => {
  if (totalHour > 24) {
    return true;
  }

  return false;
};

