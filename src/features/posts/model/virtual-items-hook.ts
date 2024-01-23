import { useMemo, useState } from 'react';
import { itemHeight, containerHeight, overscan } from '../../../shared/consts';
import { IPost } from '../../../entities/post/post';

export default function useVirtualItemsHook() {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [page, setPage] = useState<number>(0);
  const [allItems, setAllItems] = useState<IPost[]>([]);
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

  return {
    virtualItems,
    setScrollTop,
    setAllItems,
    allItems,
    page,
    setIsPageUploading,
    isPageUploading,
  };
}
