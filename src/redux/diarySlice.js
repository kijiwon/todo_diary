import { createSlice } from '@reduxjs/toolkit';

const diarySlice = createSlice({
  name: 'diary',
  initialState: {
    data: [],
  },
  reducers: {
    addDiary: (state, action) => {
      const { id, date, weather, text } = action.payload;
      state.data.unshift({ id, date, weather, text });
    },
    editDiary: (state, action) => {
      const { id, date, weather, text } = action.payload;
      const diaryToEdit = state.data.find((it) => it.id === id);
      if (diaryToEdit) {
        diaryToEdit.date = date;
        diaryToEdit.weather = weather;
        diaryToEdit.text = text;
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
