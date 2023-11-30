import styled from 'styled-components';
import { COLOR } from './style/theme';

const AppWrapper = styled.div`
  background-color: ${COLOR.bg_blue};
  width: 100%;
  height: 100vh;
`;

function App() {
  return <AppWrapper></AppWrapper>;
}

export default App;
