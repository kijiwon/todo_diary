import { combineReducers } from 'redux';
import todoReducer from './todoSlice';
import diaryReducer from './diarySlice';

const rootReducer = combineReducers({
  todo: todoReducer,
  diary: diaryReducer,
});

export default rootReducer;
