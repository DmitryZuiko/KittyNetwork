import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Authorization } from "./components/auth";
import { Login } from "./components/login";
import { UserPage } from "./components/user-page";
import { FriendsPage } from "./components/friends-page"
import { StartPage } from "./components/start-page";


const App: React.FC = () => {
  return (
      <Switch>
        <Route path='/' exact>
            <StartPage />
        </Route>
        <Route path='/auth' exact>
          <Authorization />
        </Route>
        <Route path='/login' exact>
          <Login />
        </Route>
        <Route path='/home' exact>
          <UserPage />
        </Route>
          <Route path='/friends' exact>
          <FriendsPage />
      </Route>
      </Switch>
  );
}

export default App;
