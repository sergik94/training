import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import App from './App';
import { UserInfoProvider } from './components/UserInfoContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <HashRouter>
    <UserInfoProvider>
      <App />
    </UserInfoProvider>
  </HashRouter>,
);
