import { useParams } from 'react-router-dom';
import PostCardInfo from '../../entities/post-card-info/post-card-info';

export default function PostInfo() {
  const { id } = useParams();

  return <PostCardInfo id={Number(id)} />;
}
