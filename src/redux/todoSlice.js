import { createSlice } from '@reduxjs/toolkit';

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    data: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const { id, date, text, importance } = action.payload;
      state.data.push({ id, date, text, importance, complete: false });
    },
    editTodo: (state, action) => {
      const { id, text, importance } = action.payload;
      const todoToEdit = state.data.find((todo) => todo.id === id);
      if (todoToEdit) {
        todoToEdit.text = text;
        todoToEdit.importance = importance;
      }
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

export const { addTodo, editTodo, deleteTodo, completeTodo } =
  todoSlice.actions;
export default todoSlice.reducer;
