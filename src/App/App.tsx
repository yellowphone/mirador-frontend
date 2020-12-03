import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedAdventure } from '../components/adventure/ConnectedAdventure';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItenterary } from '../components/itenterary/ConnectedItenterary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { Paths } from '../utils/paths';

export const App: React.FC = () => {
    return (
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path={Paths.Blog} component={ConnectedHome} />
            <Route exact path={Paths.Home} component={ConnectedBlog} />
            <Route exact path={Paths.Adventure} component={ConnectedAdventure} />
            <Route exact path={Paths.Itenerary} component={ConnectedItenterary} />
            <Route exact path={Paths.Profile} component={ConnectedProfile} />
            <Redirect from='*' to={Paths.Home} />
          </Switch>
        </Router>
      </ChakraProvider>
    );
}

export default App;
