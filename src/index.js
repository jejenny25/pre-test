import React from 'react';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './assets/css/styled';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import RootReducer from './store/reducers';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구
import App from './App';

const store = createStore(RootReducer, composeWithDevTools());
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>
);
