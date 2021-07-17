import React, { useState } from 'react';
import './App.scss';
import {Link, Route, Switch, useHistory} from 'react-router-dom';
import Home from './Routes/Home/Home';
import Todos from './Routes/Todos/Todos';
import { AppBar, Button, Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText, Toolbar, Typography } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import ListIcon from '@material-ui/icons/List';
import MenuIcon from '@material-ui/icons/Menu';
import AppleIcon from '@material-ui/icons/Apple';

interface RouteDefinition {
  name: string;
  path: string;
}

export const App = () => {
  const history = useHistory();
  const routes: RouteDefinition[] = [
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

  return (
    <div className="App">
    <AppBar className="top-bar" position="sticky">
      <Toolbar>
        <Typography variant="h6">
          {currentPath}
        </Typography>
      </Toolbar>
    </AppBar>
    <Drawer
        className="drawer"
        variant="permanent"
        anchor="left"
      >
        <List>
          <ListItem>
                <ListItemIcon><AppleIcon /></ListItemIcon>
            </ListItem>
          {routes.map(({name, path}, index) => (
            <ListItem button key={name} onClick={() => handleLinkClick(name, path)}>
                <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <ListIcon />}</ListItemIcon>
                <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
    </Drawer>
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

