import styled from 'styled-components';
import { COLOR, SIZE } from './style/theme';
import { DesktopMenuBar, MobileMenuBar } from './component/MenuBar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Todo from './pages/Todo';
import Diary from './pages/Diary';
import Calendar from './pages/Calendar';
import Info from './pages/Info';

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
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/info" element={<Info />} />
        </Routes>
        <MobileMenuBar size={'mobile'} />
      </AppWrapper>
    </BrowserRouter>
  );
}

export default App;
