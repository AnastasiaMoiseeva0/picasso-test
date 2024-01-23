import './posts.scss';
import { useRef, useEffect } from 'react';
import Post, { IPost } from '../../entities/post/post';
import { postApi } from '../../shared/api';
import useVirtualItemsHook from './model/virtual-items-hook';

const ITEM_HEIGHT = 162;
const CONTAINER_HEIGHT = 600;

export default function Posts() {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const { items, addItems, page } = useVirtualItemsHook<IPost>(
    scrollElementRef!,
    ITEM_HEIGHT,
    CONTAINER_HEIGHT
  );

  const { data: posts } = postApi.useGetAllPostsQuery({
    limit: 10,
    start: page * 10,
  });

  useEffect(() => {
    addItems(posts || []);
  }, [posts]);

  return (
    <main className="posts" ref={scrollElementRef}>
      {items?.map(({ data: post, offsetTop }) => {
        return (
          <section
            className="posts__item"
            style={{
              transform: `translateY(${offsetTop}px)`,
            }}
            key={post.id}
          >
            <Post post={post} />
          </section>
        );
      })}
    </main>
  );
}
