// nicked from https://usehooks.com/usePrevious/
import { useEffect, useRef } from 'react';

export default function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}
