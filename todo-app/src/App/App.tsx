import React, { useState } from 'react';
import './App.scss';
import { Route, Switch, useHistory} from 'react-router-dom';
import Home from './Routes/Home/Home';
import Todos from './Routes/Todos/Todos';
import AppLayout, { IAppLayoutProps } from './Components/AppLayout/AppLayout';


export interface AppRouteDefinition {
  name: string;
  path: string;
}

export const App = () => {
  const history = useHistory();
  const routes: AppRouteDefinition[] = [
    {
      name: 'Home',
      path: '/'
    },
    {
      name: 'Todos',
      path: '/todos'
    }
  ]
  const handleLinkClick = (name: string, path: string) => {
    history.push(path);
    setCurrentPath(name);
  }
  const [currentPath, setCurrentPath] = useState('Home');

  const appLayoutProps: IAppLayoutProps = {
    currentPath,
    handleLinkClick,
    routes
  }

  return (
    <div className="App">
    <AppLayout {...appLayoutProps}/>
    <Switch>
      <div className="main">
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/todos">
          <Todos />
        </Route>
      </div>
    </Switch>
    </div>
  );
}

