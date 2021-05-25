import { Box } from '@chakra-ui/react';
import React from 'react';
import styled from 'styled-components';
import { ActionBar } from './ActionBar';
import { ProfileCard } from './ProfileCard';
import { gradientRanges } from '../../utils/styles/gradients';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 500px 1fr;
  height: 100%;
`;

const randomGradient =
  gradientRanges[Math.floor(Math.random() * gradientRanges.length)];

export const Profile = (): React.ReactElement => {
  return (
    <>
      <Box w="100%" h="175px" bgGradient={`linear(to-l, ${randomGradient})`} />
      <Wrapper>
        <ProfileCard />
        <ActionBar />
      </Wrapper>
    </>
  );
};
