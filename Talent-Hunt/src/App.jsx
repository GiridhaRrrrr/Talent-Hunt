import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import store from './store/store.js';
import AppRoutes from './routes';
import { authServices } from './services/appwrite';
// import { logIn } from './store/AuthSlice.js ';
import { logIn } from './store/AuthSlice.js';

// for checking and updating the state is user logged in or not
const AuthInitializer = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      try {
        const userData = await authServices.getCurrentUser();
        if (userData) {
          dispatch(logIn({ userData }));
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
      }
    };

    initAuth();
  }, [dispatch]);

  return <>{children}</>;
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <AuthInitializer>
          <AppRoutes />
        </AuthInitializer>
      </Router>
    </Provider>
  );
}

export default App;