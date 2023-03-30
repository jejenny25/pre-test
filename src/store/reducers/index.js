import { combineReducers } from 'redux';
import QuizReducer from './quiz';

const RootReducer = combineReducers({
  QuizReducer,
});

export default RootReducer;
