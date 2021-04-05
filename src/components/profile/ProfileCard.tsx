import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import React from 'react';
import { getUserContext } from '../../utils/userContext';

export const ProfileCard = (): React.ReactElement => {
  const user = getUserContext();

  return (
    <Box
      margin="auto"
      maxW="30em"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Stack direction="row">
        <Image
          src={user?.image_url}
          alt="Profile picture"
          borderRadius="full"
          boxSize="150px"
        />
        <Box p="6">
          <Box>{user?.email}</Box>
          <Box>100 Followers &bull; 50 Following</Box>
          <Box>{user?.fullname}</Box>
          <Stack direction="row" wrap="wrap">
            <Badge>Climbing</Badge>
            <Badge>Hiking</Badge>
            <Badge>Canoing</Badge>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};
