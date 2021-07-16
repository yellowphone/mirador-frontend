import { useQuery } from '@apollo/client';
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Wrap,
} from '@chakra-ui/react';
import React, { useCallback, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { FIND_USER } from '../../graphql/queries/userQuery';
import { spacer24 } from '../../utils/styles/constants';
import { IBlog } from '../blog/Blog.types';
import { Experience } from '../experience/single-experience/SingleExperience.type';
import { FindTripByIdObject } from '../trip/single-trip/SingleTrip.types';
import { BlogCard, ExperienceCard, TripCard } from './Card';

export interface UserData {
  blogs: IBlog[];
  email: string;
  experiences: Experience[];
  firstname: string;
  trips: FindTripByIdObject[];
  lastname: string;
  pkuser: number;
  username: string;
}

const ActionBarContainer = styled.section`
  overflow-y: scroll;
  padding: ${spacer24};
`;

export const ActionBar = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);
  const history = useHistory();

  const [userData, setUserData] = useState<Partial<UserData>>({});
  console.log({ userData });

  useQuery(FIND_USER, {
    variables: {
      pkuser: cookie.user.pkuser,
    },
    onCompleted: incomingData => {
      setUserData(incomingData.findUser);
    },
    fetchPolicy: 'cache-and-network',
  });

  const calcDefaultIndex = useCallback(() => {
    const tabs = ['experiences', 'blogs', 'trips'];
    if (!history.location.search) return 0;
    return tabs.findIndex(tab => history.location.search.includes(tab));
  }, [history]);

  return (
    <ActionBarContainer>
      <Tabs
        variant="soft-rounded"
        colorScheme="green"
        defaultIndex={calcDefaultIndex()}
      >
        <TabList>
          <Tab onClick={() => history.push('/profile?tab=experiences')}>
            Experiences
          </Tab>
          <Tab onClick={() => history.push('/profile?tab=blogs')}>Blogs</Tab>
          <Tab onClick={() => history.push('/profile?tab=trips')}>Trips</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Wrap>
              {userData.experiences &&
                userData.experiences.map((experience: Experience) => (
                  <ExperienceCard
                    key={experience.public_identifier}
                    experience={experience}
                  />
                ))}
            </Wrap>
          </TabPanel>

          <TabPanel>
            <Wrap>
              {userData.blogs &&
                userData.blogs.map((blog: IBlog) => (
                  <BlogCard key={blog.public_identifier} blog={blog} />
                ))}
            </Wrap>
          </TabPanel>

          <TabPanel>
            <Wrap>
              {userData.trips &&
                userData.trips.map((trip: FindTripByIdObject) => (
                  <TripCard key={trip.public_identifier} trip={trip} />
                ))}
            </Wrap>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </ActionBarContainer>
  );
};
