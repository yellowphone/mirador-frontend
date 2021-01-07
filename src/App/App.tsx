import { ChakraProvider } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedExperience } from '../components/experience/ConnectedExperience';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItinerary } from '../components/itinerary/ConnectedItinerary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { Paths } from '../utils/paths';

// graphql imports
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

import { ConnectedSingleExperience } from '../components/experience/single_experience/ConnectedSingleExperience';
import { ConnectedCreateExperience } from '../components/experience/create_experience/ConnectedCreateExperience';

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
            <Route exact path={Paths.Experience} component={ConnectedExperience} />
            <Route exact path={Paths.Itinerary} component={ConnectedItinerary} />
            <Route exact path={Paths.Profile} component={ConnectedProfile} />
            <Route exact path={Paths.SingleExperience} component={ConnectedSingleExperience} />
            <Route exact path={Paths.CreateExperience} component={ConnectedCreateExperience} />
            <Redirect from='*' to={Paths.Home} />
          </Switch>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
