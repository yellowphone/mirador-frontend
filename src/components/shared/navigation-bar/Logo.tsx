// /* Tutorial on https://fossheim.io/writing/posts/css-text-gradient. */

import { Heading, Link } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link as ReactRouterLink } from 'react-router-dom';

const theme1 = ['#9AC4F8', '#99EDCC', '#CB958E', '#E36588', '#9A275A'];
const theme2 = ['#fb5012', '#01fdf6', '#cbbaed', '#e9df00', '#03fcba'];
const theme3 = ['#88ccf1', '#c1dff0', '#3587a4', '#2d848a', '#2d898b'];
const theme4 = ['#af2bbf', '#a14ebf', '#6c91bf', '#5fb0b7', '#5bc8af'];

const themes = [theme1, theme2, theme3, theme4];

const randomTheme = themes[Math.floor(Math.random() * themes.length)];

export const BrandLink = styled(Link)`
  align-items: center;
  display: flex;
  &:hover {
    color: inherit;
    text-decoration: none;
  }
`;

const rainbowTextSimpleAnimationRev = keyframes`
  0% {
    background-size: 650%;
   }
   40% {
    background-size: 650%;
   }
   100% {
    background-size: 100%;
   }
`;

const rainbowTextSimpleAnimation = keyframes`
  0% {
    background-size: 100%;
  }
  80% {
    background-size: 650%;
  }
  100% {
    background-size: 650%;
  }
`;

const StyledHeading = styled(Heading)`
  background-color: #ca4246;

  /* Create the gradient. */
  background-image: linear-gradient(
    45deg,
    ${randomTheme[0]} 16.666%,
    ${randomTheme[0]} 16.666%,
    ${randomTheme[1]} 33.333%,
    ${randomTheme[1]} 33.333%,
    ${randomTheme[2]} 50%,
    ${randomTheme[2]} 50%,
    ${randomTheme[3]} 66.666%,
    ${randomTheme[3]} 66.666%,
    ${randomTheme[4]} 83.333%,
    ${randomTheme[4]} 83.333%
  );

  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  /* Animate the text when loading the element. */
  /* This animates it on page load and when hovering out. */
  animation: ${rainbowTextSimpleAnimationRev} 0.75s ease forwards;

  &:hover {
    animation: ${rainbowTextSimpleAnimation} 0.5s ease-in forwards;
  }
`;

export const Logo = ({ path }: { path: string }): ReactElement => {
  return (
    <BrandLink to={path} as={ReactRouterLink}>
      <StyledHeading forwardedAs="h1" size="lg" fontFamily="Comfortaa">
        Mirador
      </StyledHeading>
    </BrandLink>
  );
};
