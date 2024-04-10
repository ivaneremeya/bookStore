import React from "react";

type CallbackFunction = (param: number) => void;

export const useDebounce = (
  callback: CallbackFunction,
  delay: number,
): CallbackFunction => {
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const debouncedCallback = React.useCallback<CallbackFunction>(
    (param: number) => {
      clearTimeout(timeoutRef.current as NodeJS.Timeout);
      timeoutRef.current = setTimeout(() => {
        callback(param);
      }, delay);
    },
    [callback, delay],
  );

  React.useEffect(() => {
    clearTimeout(timeoutRef.current as NodeJS.Timeout);
  }, []);

  return debouncedCallback;
};
