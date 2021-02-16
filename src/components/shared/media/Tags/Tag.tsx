import React, { FC, useCallback } from 'react';
import { TagDataProps } from './Tag.types';
import { Badge } from "@chakra-ui/react"

export const Tag: FC<TagDataProps> = ({ tag }) => {
    const color = useCallback((tag: string) => {
        switch(tag.toUpperCase()) {
            case "CAMPING":
                return 'yellow';
            case "CLIMBING":
                return 'blue';
            case "HIKING":
                return 'green';
            case "MUSEUM":
                return 'teal';
            case "RESTAURANT":
                return 'red'
            default:
                return 'orange';
        }
    }, [tag]);

    return (
        <Badge borderRadius="full" px="2" colorScheme={color(tag)}>
            {tag.toUpperCase()}
        </Badge>
    )
}