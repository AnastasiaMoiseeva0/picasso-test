import './posts.scss';
import { useEffect, useState } from 'react';
import Post from '../../entities/post/post';
import { IPost } from '../../entities/post/post';
import { postApi } from '../../shared/api';

export default function Posts() {
  const [currentPostStart, setCurrentPostStart] = useState<number>(0);
  const [isMyFetching, setIsFetchingDown] = useState<boolean>(false);
  const [isMyFetchingUp, setIsMyFetchingUp] = useState<boolean>(false);
  const { data: posts, isLoading } = postApi.useGetAllPostsQuery({
    limit: 10,
    start: currentPostStart,
  });

  useEffect(() => {
    if (isMyFetching) {
      setCurrentPostStart((prev) => {
        return prev < 90 ? prev + 5 : prev;
      });
      setIsFetchingDown(false);
    }
  }, [isMyFetching]);

  useEffect(() => {
    if (isMyFetchingUp) {
      setCurrentPostStart((prev) => {
        return prev > 0 ? prev - 5 : prev;
      });
      setIsMyFetchingUp(false);
    }
  }, [isMyFetchingUp]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const scrollHandler = (e: any): void => {
    if (e.target.documentElement.scrollTop < 50) {
      setIsMyFetchingUp(true);
    }
    if (
      e.target.documentElement.scrollHeight -
        e.target.documentElement.scrollTop -
        window.innerHeight <
      50
    ) {
      setIsFetchingDown(true);
      window.scrollTo(
        0,
        e.target.documentElement.scrollHeight +
          e.target.documentElement.scrollTop
      );
    }
  };

  return (
    <main className="posts">
      <div className="posts__item">
        {posts?.map((post: IPost) => (
          <Post post={post} key={post.id} />
        ))}
      </div>
      {isLoading && <div>Загрузка данных</div>}
    </main>
  );
}
