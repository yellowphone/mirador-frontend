import { Badge, Box, Image, Stack } from '@chakra-ui/react';
import React from 'react';

export const ProfileCard = () => {

    return (
        <Box maxW="30em" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Stack direction='row'>
                <Image 
                    src={'https://www.trbimg.com/img-57d07f92/turbine/dp-ugc-article-toanos-geo-min-wins-dominion-scholarship-2016-09-07'}
                    alt='Profile picture'
                    borderRadius="full"
                    boxSize="150px"
                />
                <Box p="6">
                    <Box>
                        baileyg2016
                    </Box>
                    <Box>
                        100 Followers &bull; 50 Following
                    </Box>
                    <Box>
                        Bailey Spell
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