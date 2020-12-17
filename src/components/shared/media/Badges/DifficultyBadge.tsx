import { Badge } from '@chakra-ui/react';
import React, { FC, useCallback } from 'react';
import { DifficultyBadgeDataProps, DifficultyType } from './Badges.types';

export const DifficultyBadge: FC<DifficultyBadgeDataProps> = ({ difficulty }) => {
    const color = useCallback((difficulty: string) => {
        switch (difficulty) {
            case DifficultyType.Easy:
                return 'green';
            case DifficultyType.Medium:
                return 'orange';
            case DifficultyType.Hard:
                return 'red';
            default:
                return 'teal';
        }
    }, [difficulty]);

    return (
        <Badge borderRadius="full" px="2" colorScheme={color(difficulty)}>
            difficulty
        </Badge>
    );
}