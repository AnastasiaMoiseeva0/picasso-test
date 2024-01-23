import { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { overscan } from '../../../shared/consts';

export type VirtialItem<T> = {
  data: T;
  offsetTop: number;
};

export default function useVirtualItemsHook<T>(
  ref: React.RefObject<HTMLElement>,
  itemHeight: number,
  containerHeight: number
) {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [allItems, setAllItems] = useState<T[]>([]);
  const [isPageUploading, setIsPageUploading] = useState<boolean>(false);

  const virtualItems = useMemo(() => {
    const rangeStart = scrollTop;
    const rangeEnd = scrollTop + containerHeight;

    let startIndex = Math.floor(rangeStart / itemHeight);
    let endIndex = Math.ceil(rangeEnd / itemHeight);

    startIndex = Math.max(0, startIndex - overscan);
    endIndex = Math.min((allItems?.length || 0) - 1, endIndex + overscan);

    if (
      allItems.length &&
      endIndex > allItems.length - overscan &&
      !isPageUploading
    ) {
      setPage(page + 1);
      setIsPageUploading(true);
    }

    const virtualItems = [];
    for (let index = startIndex; index <= endIndex; index++) {
      virtualItems.push({
        index,
        offsetTop: index * itemHeight,
      });
    }

    return virtualItems;
  }, [scrollTop, allItems?.length]);

  useLayoutEffect(() => {
    const currentRef = ref.current;

    function handlerScroll(e: Event) {
      const scrollElement = e.target as HTMLElement;

      if (scrollElement === null) {
        return;
      }

      const scrollTop = scrollElement!.scrollTop;

      setScrollTop(scrollTop);
    }

    currentRef?.addEventListener('scroll', handlerScroll);
    return () => currentRef?.removeEventListener('scroll', handlerScroll);
  }, [isPageUploading, ref]);

  const items = useMemo(() => {
    return virtualItems.map(({ index, offsetTop }) => ({
      data: allItems[index],
      offsetTop,
    }));
  }, [virtualItems, allItems]);

  const addItems = useCallback(
    (newItems: T[]) => {
      setAllItems([...allItems, ...newItems]);
      setIsPageUploading(false);
    },
    [setAllItems, allItems]
  );

  return {
    addItems,
    page,
    items,
  };
}
