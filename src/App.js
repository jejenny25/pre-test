import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const QuizList = React.lazy(() => import('./pages/QuizList'));
const QuizDetail = React.lazy(() => import('./pages/QuizDetail'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/*' name='Quiz list' element={<QuizList />} />
        <Route exact path='/quiz' name='Quiz' element={<QuizDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
