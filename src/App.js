import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Containers
const QuizList = React.lazy(() => import('./pages/QuizList'));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/*' name='Home' element={<QuizList />} />
        {/* <Route path='/roomDetail' element={<RoomDetail />} />
        <Route path='/reserve' element={<Reserve />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
