import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GlobalStyle } from './style/GlobalStyle';

import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ScrollToTop } from './component/ScrollToTop';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <GlobalStyle />
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </PersistGate>
  </Provider>,
);
