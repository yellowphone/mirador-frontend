import { StarIcon } from '@chakra-ui/icons';
import React, { FC } from 'react';
import { StarsDataProps } from './Stars.types';

export const Stars: FC<StarsDataProps> = ({ rating }) => {
  const _stars = Array(5)
    .fill('')
    .map((_, i) => (
      <StarIcon key={i} color={i < rating ? 'teal.500' : 'gray.300'} />
    ));

  return <>{_stars}</>;
};
