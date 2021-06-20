import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@fontsource/source-sans-pro/400.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/comfortaa/700.css';
import React from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { Paths } from '../utils/paths';
import { CookiesProvider } from 'react-cookie';

// graphql imports
import { ApolloProvider } from '@apollo/client';
import { client } from '../graphql/client';

// Page imports
import { ConnectedExperience } from '../components/experience/ConnectedExperience';
import { ConnectedBlog } from '../components/blog/ConnectedBlog';
import { ConnectedHome } from '../components/home/ConnectedHome';
import { ConnectedItinerary } from '../components/itinerary/ConnectedItinerary';
import { ConnectedProfile } from '../components/profile/ConnectedProfile';
import { ConnectedSingleExperience } from '../components/experience/single-experience/ConnectedSingleExperience';
import { ConnectedCreateExperience } from '../components/experience/create-experience/ConnectedCreateExperience';
import { ConnectedSingleBlog } from '../components/blog/single-blog/ConnectedSingleBlog';
import { ConnectedCreateBlog } from '../components/blog/create-blog/ConnectedCreateBlog';
import { ConnectedCreateItinerary } from '../components/itinerary/create-itinerary/ConnectedCreateItinerary';
import { ConnectedSingleItinerary } from '../components/itinerary/single-itinerary/ConnectedSingleItinerary';
import { ConnectedEditItinerary } from '../components/itinerary/edit-itinerary/ConnectedEditItinerary';
import { ConnectedEditBlog } from '../components/blog/edit-blog/ConnectedEditBlog';
import { LocationContextWrapper } from '../utils/context/LocationContext';
import { NavigationBar } from '../components/shared/navigation-bar/NavigationBar';
import styled from 'styled-components';
import { HEADER_HEIGHT } from '../utils/styles/constants';

const theme = extendTheme({
  fonts: {
    heading: 'Open Sans',
    body: 'Source Sans Pro',
  },
});

const Main = styled.main`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow: hidden;
`;

export const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <LocationContextWrapper>
        <CookiesProvider>
          <ChakraProvider theme={theme}>
            <Router>
              <NavigationBar />
              <Main>
                <Switch>
                  <Route exact path={Paths.Blog} component={ConnectedBlog} />
                  <Route
                    exact
                    path={`${Paths.SingleBlog}/:id`}
                    component={ConnectedSingleBlog}
                  />
                  <Route
                    exact
                    path={`${Paths.EditBlog}/:id`}
                    component={ConnectedEditBlog}
                  />
                  <Route
                    exact
                    path={Paths.CreateBlog}
                    component={ConnectedCreateBlog}
                  />
                  <Route exact path={Paths.Home} component={ConnectedHome} />
                  <Route
                    exact
                    path={Paths.Experience}
                    component={ConnectedExperience}
                  />
                  <Route
                    exact
                    path={`${Paths.SingleExperience}/:id`}
                    component={ConnectedSingleExperience}
                  />
                  <Route
                    exact
                    path={Paths.CreateExperience}
                    component={ConnectedCreateExperience}
                  />
                  <Route
                    exact
                    path={Paths.Itinerary}
                    component={ConnectedItinerary}
                  />
                  <Route
                    exact
                    path={`${Paths.SingleItinerary}/:id`}
                    component={ConnectedSingleItinerary}
                  />
                  <Route
                    exact
                    path={Paths.CreateItinerary}
                    component={ConnectedCreateItinerary}
                  />
                  <Route
                    exact
                    path={`${Paths.EditItinerary}/:id`}
                    component={ConnectedEditItinerary}
                  />
                  <Route
                    exact
                    path={Paths.Profile}
                    component={ConnectedProfile}
                  />
                  <Redirect from="*" to={Paths.Home} />
                </Switch>
              </Main>
            </Router>
          </ChakraProvider>
        </CookiesProvider>
      </LocationContextWrapper>
    </ApolloProvider>
  );
};

export default App;
