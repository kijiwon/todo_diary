import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const { id, date, text, importance } = action.payload;
      state.data.unshift({ id, date, text, importance, complete: false });
    },

    deleteTodo: (state, action) => {
      const selectedId = action.payload;
      state.data = state.data.filter((todo) => todo.id !== selectedId);
    },
    completeTodo: (state, action) => {
      const selectedId = action.payload;
      state.data = state.data.map((todo) =>
        todo.id === selectedId ? { ...todo, complete: !todo.complete } : todo,
      );
    },
  },
});

export const { addTodo, deleteTodo, completeTodo } = todoSlice.actions;
export default todoSlice.reducer;
