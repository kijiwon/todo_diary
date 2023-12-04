import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    data: [],
  },
  reducers: {
    addDiary: (state, action) => {
      state.data.push(action.payload);
    },
    editDiary: (state, action) => {
      const { id, date, weather, content } = action.payload;
      const diaryToEdit = state.data.find((it) => it.id === id);
      if (diaryToEdit) {
        diaryToEdit.date = date;
        diaryToEdit.weather = weather;
        diaryToEdit.content = content;
      }
    },
    deleteDiary: (state, action) => {
      const selectedId = action.payload;
      state.data = state.data.filter((it) => it.id !== selectedId);
    },
  },
});

export const { addDiary, editDiary, deleteDiary } = diarySlice.actions;
export default diarySlice.reducer;
