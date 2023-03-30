import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const loading = <div>화면을 불러오는 중 입니다.</div>;

const QuizList = React.lazy(() => import('./pages/QuizList'));
const QuizDetail = React.lazy(() => import('./pages/QuizDetail'));
const AnswerConfirm = React.lazy(() => import('./pages/AnswerConfirm'));
//const AnswerWrong = React.lazy(() => import('./pages/AnswerWrong'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path='/' name='Quiz list' element={<QuizList />} />
          <Route path='/quiz' element={<QuizDetail />} />
          <Route path='/correct' element={<AnswerConfirm />} />
          {/* <Route path='/quiz' element={<AnswerWrong />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
