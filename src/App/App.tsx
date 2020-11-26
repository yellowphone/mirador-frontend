import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Adventure } from '../components/adventure/Adventure';
import { Blog } from '../components/blog/Blog';
import { Home } from '../components/home/Home';
import { Itenterary } from '../components/itenterary/Itenterary';
import { Profile } from '../components/profile/Profile';
import { Paths } from '../utils/paths';

export const App: React.FC = () => {
    return (
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path={Paths.Home} component={Adventure} />
            <Route exact path={Paths.Blog} component={Blog} />
            <Route exact path={Paths.Adventure} component={Home} />
            <Route exact path={Paths.Itenerary} component={Itenterary} />
            <Route exact path={Paths.Profile} component={Profile} />
            <Redirect from='*' to={Paths.Home} />
          </Switch>
        </Router>
      </ChakraProvider>
    );
}

export default App;
