import React, { FC } from 'react';
import { TagGridDataProps } from './Tag.types';
import { CategoryTag } from './CategoryTag';
import { HStack } from "@chakra-ui/react"

export const TagGrid: FC<TagGridDataProps> = ({ tags }) => {

    return (
        <>
        <HStack spacing={2}>
            {tags && tags.map((item, index) => {
                return(
                    <CategoryTag key={index} tag={item["tags"]["tag"]}/>
                )
                
            })}
        </HStack>
        </>
    )
}