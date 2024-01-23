import './post-card-info.scss';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../../shared/api';
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

interface PostCardInfoProps {
  id: number;
}

export default function PostCardInfo({ id }: PostCardInfoProps) {
  const { data: post, isFetching, isSuccess } = postApi.useGetPostByIdQuery(id);
  const navigate = useNavigate();

  return (
    <main className="post-info">
      {isFetching ? <div>Идет загрузка</div> : isSuccess}
      <Button
        className="post-info__button"
        startIcon={<ArrowBack />}
        onClick={() => navigate(-1)}
        size="small"
        variant="text"
      >
        Назад
      </Button>
      <section className="post-info__container">
        <header className="post-info__header">
          {post?.id} <span className="post-info__title">{post?.title}</span>
        </header>
        <p className="post-info__description">{post?.body}</p>
      </section>
    </main>
  );
}
