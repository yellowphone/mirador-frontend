import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedAdventure } from '../components/adventure/ConnectedAdventure';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItinerary } from '../components/itinerary/ConnectedItinerary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { Paths } from '../utils/paths';

// graphql imports
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

import { SingleAdventure } from '../components/adventure/single_adventure/SingleAdventure';
import { CreateAdventure } from '../components/adventure/create_adventure/CreateAdventure';

export const App: React.FC = () => {

  useEffect(() => {
    const bootstrapAsync = async () => {
    }
    bootstrapAsync();
  });

  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Router>
          <Switch>
            <Route exact path={Paths.Blog} component={ConnectedBlog} />
            <Route exact path={Paths.Home} component={ConnectedProfile} />
            <Route exact path={Paths.Adventure} component={ConnectedAdventure} />
            <Route exact path={Paths.Itinerary} component={ConnectedItinerary} />
            <Route exact path={Paths.Profile} component={ConnectedProfile} />
            <Route exact path={Paths.SingleAdventure} component={SingleAdventure} />
            <Route exact path={Paths.CreateAdventure} component={CreateAdventure} />
            <Redirect from='*' to={Paths.Home} />
          </Switch>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
