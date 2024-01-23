import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import './app.scss';
import PostInfo from '../pages/post-info/post-info';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
        <Route path="/post/:id" element={<PostInfo />}></Route>
      </Routes>
    </>
  );
}
