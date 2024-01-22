import './post-card.scss';
import { Button } from '@mui/material';

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
interface PostProps {
  post: IPost;
}

export default function Post({ post }: PostProps) {
  return (
    <article className="post">
      <header className="post__header">
        {post.id} <span className="post__title">{post.title}</span>
      </header>
      <p className="post__description">{post.body}</p>
      <Button size="small" variant="text">
        Просмотр
      </Button>
    </article>
  );
}
