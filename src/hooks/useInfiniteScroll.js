import { useState, useEffect } from 'react';

const useInfiniteScroll = (callback, search) => {
  const [isFetching, setIsFetching] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching || !hasMore || search) return;
    callback();
  }, [isFetching, hasMore, search]);

  function handleScroll() {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !== document.documentElement.offsetHeight ||
      isFetching ||
      !search
    )
      return;

    if (hasMore) {
      setIsFetching(true);
    }
  }

  return [isFetching, setIsFetching, setHasMore, hasMore];
};

export default useInfiniteScroll;
