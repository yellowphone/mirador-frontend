import { useQuery } from '@apollo/client';
import {
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { FIND_USER } from '../../graphql/queries/userQuery';
import { IBlog } from '../blog/Blog.types';
import { Experience } from '../experience/single-experience/SingleExperience.type';
import { FindItineraryByIdObject } from '../itinerary/single-itinerary/SingleItinerary.types';

export interface UserData {
  blogs: IBlog[];
  email: string;
  experiences: Experience[];
  firstname: string;
  itineraries: FindItineraryByIdObject[];
  lastname: string;
  pkuser: number;
  username: string;
}

export const ActionBar = (): React.ReactElement => {
  const [cookie] = useCookies(['user']);

  const [userData, setUserData] = useState<Partial<UserData>>({});

  useQuery(FIND_USER, {
    variables: {
      pkuser: cookie.user.pkuser,
    },
    onCompleted: incomingData => {
      setUserData(incomingData.findUser);
    },
    fetchPolicy: 'cache-and-network',
  });

  return (
    <div style={{ paddingTop: '10px' }}>
      <Center>
        <Tabs variant="soft-rounded">
          <TabList>
            <Tab>Overview</Tab>
            <Tab>Experiences</Tab>
            <Tab>Blogs</Tab>
            <Tab>Itineraries</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>Overview</p>
              <p>A current temporary solution and just passing in data</p>
              <p>Will need UI work</p>
            </TabPanel>

            <TabPanel>
              <p>Experiences</p>
            </TabPanel>

            <TabPanel>
              <p>Blogs</p>
              {userData.blogs &&
                userData.blogs.map((blog: IBlog, index: number) => {
                  return <p key={index}>title: {blog.title}</p>;
                })}
            </TabPanel>

            <TabPanel>
              <p>Itineraries</p>
              {userData.itineraries &&
                userData.itineraries.map(
                  (itinerary: FindItineraryByIdObject, index: number) => {
                    return <p key={index}>title: {itinerary.title}</p>;
                  }
                )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
};
