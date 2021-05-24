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

export const ActionBar = ({ data }: { data: TSFixMe }): React.ReactElement => {
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
            {/* overview */}
            <TabPanel>
              <p>Overview</p>
              <p>A current temporary solution and just passing in data</p>
              <p>Will need UI work</p>
            </TabPanel>

            {/* experiences */}
            <TabPanel>
              <p>Experiences</p>
            </TabPanel>

            {/* blogs */}
            <TabPanel>
              <p>Blogs</p>
              {data.blogs &&
                data.blogs.map((blog: TSFixMe, index: number) => {
                  return <p key={index}>title: {blog.title}</p>;
                })}
            </TabPanel>

            {/* itineraries */}
            <TabPanel>
              <p>Itineraries</p>
              {data.itineraries &&
                data.itineraries.map((itinerary: TSFixMe, index: number) => {
                  return <p key={index}>title: {itinerary.title}</p>;
                })}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </div>
  );
};
