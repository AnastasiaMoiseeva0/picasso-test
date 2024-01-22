import './post-card.scss';
import { Button } from '@mui/material';

export default function PostCard() {
  return (
    <article className="post">
      <header className="post__header">
        1 <span className="post__title">Заголовок</span>
      </header>
      <p className="post__description">Какое-то описание</p>
      <Button size="small" variant="text">
        Просмотр
      </Button>
    </article>
  );
}
