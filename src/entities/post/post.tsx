import { useNavigate } from 'react-router-dom';
import './post.scss';
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
  const navigate = useNavigate();

  return (
    <article className="post">
      <header className="post__header">
        {post.id} <span className="post__title">{post.title}</span>
      </header>
      <p className="post__description">{post.body}</p>
      <Button
        className="post__button"
        size="small"
        variant="text"
        onClick={() => navigate(`/post/${post.id}`)}
      >
        Просмотр
      </Button>
    </article>
  );
}
