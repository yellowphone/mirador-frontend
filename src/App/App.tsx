import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedAdventure } from '../components/experience/ConnectedExperience';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItinerary } from '../components/itenterary/ConnectedItinerary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { Login } from '../components/login/Login';
import { Paths } from '../utils/paths';
import { initLoginContext } from '../utils/User';

export const App: React.FC = () => {
  useEffect(() => {
    initLoginContext();
  }, [initLoginContext]);

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route exact path={Paths.Blog} component={ConnectedBlog} />
          <Route exact path={Paths.Home} component={ConnectedHome} />
          <Route exact path={Paths.Adventure} component={ConnectedAdventure} />
          <Route exact path={Paths.Itenerary} component={ConnectedItinerary} />
          <Route exact path={Paths.Profile} component={ConnectedProfile} />
          <Route exact path={Paths.Login} component={Login} />
          <Redirect from='*' to={Paths.Home} />
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
