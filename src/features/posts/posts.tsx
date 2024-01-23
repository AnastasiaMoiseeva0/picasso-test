import './posts.scss';
import { useLayoutEffect, useRef, useMemo, useState, useEffect } from 'react';
import Post from '../../entities/post/post';
import { IPost } from '../../entities/post/post';
import { postApi } from '../../shared/api';
import { itemHeight, containerHeight, overscan } from '../../shared/consts';

export default function Posts() {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [page, setPage] = useState(0);

  const { data: posts } = postApi.useGetAllPostsQuery({
    limit: 10,
    start: page * 10,
  });

  const [allItems, setAllItems] = useState<IPost[]>([]);
  const [isPageUploading, setIsPageUploading] = useState(false);

  useEffect(() => {
    setAllItems([...allItems, ...(posts || [])]);
    setIsPageUploading(false);
  }, [posts]);

  const scrollElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    function handlerScroll(e: Event) {
      const scrollElement = (e.target as Document).documentElement;

      if (scrollElement === null) {
        return;
      }

      const scrollTop = scrollElement!.scrollTop;

      setScrollTop(scrollTop);
    }

    document.addEventListener('scroll', handlerScroll);
    return () => document.removeEventListener('scroll', handlerScroll);
  }, [isPageUploading]);

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

  return (
    <main className="posts" ref={scrollElementRef}>
      {virtualItems?.map((virtualItem) => {
        const post = (allItems || [])[virtualItem.index];
        return (
          <section
            className="posts__item"
            style={{
              transform: `translateY(${virtualItem.offsetTop}px)`,
            }}
          >
            <Post post={post} key={post.id} />
          </section>
        );
      })}
    </main>
  );
}
