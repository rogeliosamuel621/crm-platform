import React, { lazy, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer';
import Loading from './components/Loading';
import { getCurrentUser } from './redux/actions/AuthenticationActions';

const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const CreateAccount = lazy(() => import('./pages/CreateAccount'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

function App() {
  const dispatch = useDispatch();
  const { status, isLogged } = useSelector(state => state.authentication);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, []);
  return (
    <>
      <Router>
        <AccessibleNavigationAnnouncer />

        <Switch>
          {status === 'idle' ? (
            <Loading />
          ) : (
            <div>
              <Route path="/login" component={Login} />
              <Route path="/create-account" component={CreateAccount} />
              <Route path="/forgot-password" component={ForgotPassword} />

              {/* Place new routes over this */}
              {isLogged ? <Route path="/app" component={Layout} /> : <Redirect to="/login" />}

              {/* If you have an index page, you can remothis Redirect */}
              <Redirect exact from="/" to="/login" />
            </div>
          )}
        </Switch>
      </Router>
    </>
  );
}

export default App;
