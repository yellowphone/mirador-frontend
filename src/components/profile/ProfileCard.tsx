import { EmailIcon } from '@chakra-ui/icons';
import {
  Badge,
  Box,
  Heading,
  Text,
  Flex,
  Avatar,
  HStack,
} from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { grey0 } from '../../utils/styles/colors';
import { getUserContext } from '../../utils/userContext';

const Profile = styled.section`
  background-color: ${grey0};
`;

const Count = ({
  number,
  text,
  last = false,
}: {
  number: number;
  text: string;
  last?: boolean;
}) => {
  return (
    <Flex
      direction="column"
      marginRight={!last ? '16px' : undefined}
      alignItems="center"
    >
      <Text fontSize="3xl" fontWeight="bold">
        {number}
      </Text>
      <Text>{text}</Text>
    </Flex>
  );
};
export const ProfileCard = (): React.ReactElement => {
  const user = getUserContext();

  return (
    <Profile>
      <Box margin="0 24px">
        <Flex justifyContent="center">
          {/* @TODO: is there a way to get a higher quality prof image? */}
          <Avatar
            src={user?.image_url}
            name={user?.fullname}
            showBorder
            borderWidth="5px"
            borderRadius="100%"
            borderColor={grey0}
            size="2xl"
            marginTop="-64px"
            marginRight="16px"
          />
        </Flex>
        <Flex direction="column" alignItems="center">
          <Heading as="h1" size="lg">
            {user?.fullname}
          </Heading>
          <Flex alignItems="center">
            <EmailIcon marginRight="2" />
            <Text fontSize="sm">{user?.email}</Text>
          </Flex>
        </Flex>
        <Flex margin="16px" direction="column" alignItems="center">
          <Heading as="h2" size="sm" marginBottom="8px">
            Tags
          </Heading>
          <HStack spacing="8px" justifyContent="center">
            <Badge>Climbing</Badge>
            <Badge>Hiking</Badge>
            <Badge>Canoing</Badge>
          </HStack>
        </Flex>
        <Flex margin="16px" justifyContent="center">
          <Count number={100} text="Followers" />
          <Count number={50} text="Following" />
        </Flex>
      </Box>
    </Profile>
  );
};
