import { useState, useLayoutEffect, useRef } from "react";

export function useTruncate<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isShowingMore, setIsShowingMore] = useState(false);

  useLayoutEffect(() => {
    const { offsetHeight, scrollHeight } = targetRef.current || {};

    if (offsetHeight && scrollHeight && offsetHeight < scrollHeight) {
      setIsTruncated(true);
    } else {
      setIsTruncated(false);
    }
  }, [targetRef]);

  const toggleIsShowingMore = () => setIsShowingMore((prev) => !prev);

  return {
    targetRef,
    isTruncated,
    isShowingMore,
    toggleIsShowingMore,
  };
}
