import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Windmill } from '@windmill/react-ui';
import { Provider } from 'react-redux';

import { store } from './redux';

import App from './App';
import { SidebarProvider } from './context/SidebarContext';
import ThemedSuspense from './components/ThemedSuspense';

// tailwindcss
import './assets/css/tailwind.css';

ReactDOM.render(
  <SidebarProvider>
    <Provider store={store}>
      <Suspense fallback={<ThemedSuspense />}>
        <Windmill usePreferences>
          <App />
        </Windmill>
      </Suspense>
    </Provider>
  </SidebarProvider>,
  document.getElementById('root')
);
