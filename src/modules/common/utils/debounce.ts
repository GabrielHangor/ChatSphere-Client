type DebounceFunction<T extends (...args: any[]) => any> = (
  func: T,
  wait: number
) => T & { cancel: () => void };

const debounce: DebounceFunction<(...args: any[]) => any> = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<T>) => {
    const later = () => {
      func.apply(this, args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced as T & { cancel: () => void };
};

export default debounce;
