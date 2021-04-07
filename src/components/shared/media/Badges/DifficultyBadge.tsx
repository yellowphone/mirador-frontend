import { Badge } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { DifficultyBadgeDataProps, DifficultyType } from './Badges.types';

export const DifficultyBadge: FC<DifficultyBadgeDataProps> = ({
  difficulty,
}) => {
  const color = useCallback((difficulty: string) => {
    switch (difficulty) {
      case DifficultyType.EASY:
        return 'green';
      case DifficultyType.MODERATE:
        return 'orange';
      case DifficultyType.HARD:
        return 'red';
      default:
        return 'teal';
    }
  }, []);

  return (
    <Badge borderRadius="full" px="2" colorScheme={color(difficulty)}>
      difficulty
    </Badge>
  );
};
