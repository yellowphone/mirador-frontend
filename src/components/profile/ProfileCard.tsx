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
import { gradientRanges } from '../../utils/styles/gradients';
import { getUserContext } from '../../utils/userContext';

const randomGradient =
  gradientRanges[Math.floor(Math.random() * gradientRanges.length)];

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
    <Flex direction="column" marginRight={!last ? '16px' : undefined}>
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
    <>
      <Box w="100%" h="175px" bgGradient={`linear(to-l, ${randomGradient})`} />
      <Box margin="0 24px">
        <Flex margin="16px 16px 40px 16px">
          <Avatar
            src={user?.image_url}
            name={user?.fullname}
            showBorder
            borderWidth="5px"
            borderRadius="100%"
            size="2xl"
            marginTop="-64px"
            marginRight="16px"
          />
          <Flex direction="column">
            <Heading as="h1" size="lg">
              {user?.fullname}
            </Heading>
            <Flex alignItems="center">
              <EmailIcon marginRight="2" />
              <Text fontSize="sm">{user?.email}</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex margin="16px" direction="column">
          <Heading as="h2" size="sm" marginBottom="8px">
            Tags
          </Heading>
          <HStack spacing="8px">
            <Badge>Climbing</Badge>
            <Badge>Hiking</Badge>
            <Badge>Canoing</Badge>
          </HStack>
        </Flex>
        <Flex margin="16px">
          <Count number={100} text="Followers" />
          <Count number={50} text="Following" />
        </Flex>
      </Box>
    </>
  );
};
