import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { ConnectedExperience } from '../components/experience/ConnectedExperience';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItinerary } from '../components/itinerary/ConnectedItinerary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { Paths } from '../utils/paths';
import { CookiesProvider } from 'react-cookie';

// graphql imports
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

import { ConnectedSingleExperience } from '../components/experience/single-experience/ConnectedSingleExperience';
import { ConnectedCreateExperience } from '../components/experience/create-experience/ConnectedCreateExperience';
import { ConnectedSingleBlog } from '../components/blog/single-blog/ConnectedSingleBlog';
import { ConnectedCreateBlog } from '../components/blog/create-blog/ConnectedCreateBlog';
import { ConnectedCreateItinerary } from '../components/itinerary/create-itinerary/ConnectedCreateItinerary';
import { ConnectedSingleItinerary } from '../components/itinerary/single-itinerary/ConnectedSingleItinerary';

export const App: React.FC = () => {

  return (
    <ApolloProvider client={client}>
      <CookiesProvider>
        <ChakraProvider>
          <Router>
            <Switch>
              <Route exact path={Paths.Blog} component={ConnectedBlog} />
              <Route exact path={Paths.SingleBlog} component={ConnectedSingleBlog} />
              <Route exact path={Paths.CreateBlog} component={ConnectedCreateBlog} />
              <Route exact path={Paths.Home} component={ConnectedHome} />
              <Route exact path={Paths.Experience} component={ConnectedExperience} />
              <Route exact path={Paths.SingleExperience + "/:id"} component={ConnectedSingleExperience} />
              <Route exact path={Paths.CreateExperience} component={ConnectedCreateExperience} />
              <Route exact path={Paths.Itinerary} component={ConnectedItinerary} />
              <Route exact path={Paths.SingleItinerary} component={ConnectedSingleItinerary} />
              <Route exact path={Paths.CreateItinerary} component={ConnectedCreateItinerary} />
              <Route exact path={Paths.Profile} component={ConnectedProfile} />
              <Redirect from='*' to={Paths.Home} />
            </Switch>
          </Router>
        </ChakraProvider>
      </CookiesProvider>
      
    </ApolloProvider>
  );
}

export default App;
