import React, { FC, useCallback } from 'react';
import { TagDataProps } from './Tag.types';
import { Tag, TagLabel, TagRightIcon, Box } from "@chakra-ui/react"
import { SmallAddIcon, SmallCloseIcon } from '@chakra-ui/icons'

export const CategoryTag: FC<TagDataProps> = ({ tag, add, close }) => {

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
        <Tag size={"sm"} colorScheme={color(tag)}>
            { add && <>
                <TagLabel>{tag.toUpperCase()}</TagLabel>
                <TagRightIcon as={SmallAddIcon}/>
            </> }
            
            { close && <>
                <TagLabel>{tag.toUpperCase()}</TagLabel>
                <TagRightIcon as={SmallCloseIcon}/>
            </> }

            { !add && !close && <>
                <TagLabel>{tag.toUpperCase()}</TagLabel>
            </> }
        </Tag>
    )
}