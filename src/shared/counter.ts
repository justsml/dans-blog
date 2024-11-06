
export const Counter = (start = 0) => {
  let count = start;
  return {
    increment: () => count++,
    decrement: () => count--,
    get: () => count,
  };
};

