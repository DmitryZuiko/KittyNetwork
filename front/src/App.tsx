import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Authorization } from "./components/auth";
import { Login } from "./components/login";
import { UserPage } from "./components/user-page";
import { FriendsPage } from "./components/friends-page"

const App: React.FC = () => {
  return (
      <Switch>
        <Route path='/auth' exact>
          <Authorization />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/home'>
          <UserPage />
        </Route>
          <Route path='/friends'>
          <FriendsPage />
      </Route>
      </Switch>
  );
}

export default App;
