import { Route, Routes } from 'react-router-dom';
import Main from '../pages/main/main';
import './app.scss';

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />}></Route>
      </Routes>
    </>
  );
}
