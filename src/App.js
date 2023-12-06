import styled from 'styled-components';
import { COLOR, SIZE } from './style/theme';
import { DesktopMenuBar, MobileMenuBar } from './component/MenuBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from './pages/Todo';
import Diary from './pages/Diary';
import TodoCalendar from './pages/TodoCalendar';
import Info from './pages/Info';
import DiaryAdd from './pages/DiaryAdd';
import DiaryDetail from './pages/DiaryDetail';
import DiaryEdit from './pages/DiaryEdit';
import TodoCalendarDetail from './pages/TodoCalendarDetail';

const AppWrapper = styled.div`
  background-color: ${COLOR.bg_blue};
  width: 100%;
  min-width: ${SIZE.mobileMin};
  height: 100vh;
  position: relative;
`;

function App() {
  return (
    <BrowserRouter>
      <AppWrapper>
        <DesktopMenuBar size={'desktop'} />
        <Routes>
          <Route path="/" element={<Todo />} />
          <Route path="/diary" element={<Diary />} />
          <Route path="/diary/add" element={<DiaryAdd />} />
          <Route path="/diary/:id" element={<DiaryDetail />} />
          <Route path="/diary/:id/edit" element={<DiaryEdit />} />
          <Route path="/calendar" element={<TodoCalendar />} />
          <Route path="/calendar/:date" element={<TodoCalendarDetail />} />
          <Route path="/info" element={<Info />} />
        </Routes>
        <MobileMenuBar size={'mobile'} />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
