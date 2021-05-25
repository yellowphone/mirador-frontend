import {
  Center,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react';
import { sortedLastIndex } from 'lodash';
import React from 'react';
import { TSFixMe } from '../../types/global';

export const ActionBar = ({
  userData,
}: {
  userData: TSFixMe;
}): React.ReactElement => {
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
                userData.blogs.map((blog: TSFixMe, index: number) => {
                  return <p key={index}>title: {blog.title}</p>;
                })}
            </TabPanel>

            <TabPanel>
              <p>Itineraries</p>
              {userData.itineraries &&
                userData.itineraries.map(
                  (itinerary: TSFixMe, index: number) => {
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
