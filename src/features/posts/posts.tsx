import './posts.scss';
import { useLayoutEffect, useRef, useEffect } from 'react';
import Post from '../../entities/post/post';
import { postApi } from '../../shared/api';
import useuseVirtualItemsHook from './model/virtual-items-hook';

export default function Posts() {
  const {
    virtualItems,
    setScrollTop,
    setAllItems,
    allItems,
    page,
    setIsPageUploading,
    isPageUploading,
  } = useuseVirtualItemsHook();

  const { data: posts } = postApi.useGetAllPostsQuery({
    limit: 10,
    start: page * 10,
  });

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
