import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import React from 'react';
import { getLoginContext } from '../../utils/User';

export const ProfileCard = () => {
    const user = getLoginContext();

    return (
        <Box margin='auto' maxW="30em" borderWidth="1px" borderRadius="lg" overflow="hidden" >
            <Stack direction='row'>
                <Image 
                    src={user.imageUrl}
                    alt='Profile picture'
                    borderRadius="full"
                    boxSize="150px"
                />
                <Box p="6">
                    <Box>
                        {user.email}
                    </Box>
                    <Box>
                        100 Followers &bull; 50 Following
                    </Box>
                    <Box>
                        {user.fullName}
                    </Box>
                    <Stack direction='row' wrap='wrap'>
                        <Badge>Climbing</Badge>
                        <Badge>Hiking</Badge>
                        <Badge>Canoing</Badge>
                    </Stack>
                </Box>
            </Stack>
        </Box>
    );
};