import React, { FC } from 'react';
import { CategoryTag } from './CategoryTag';
import { HStack } from '@chakra-ui/react';
import { ExperienceTag, TagGridDataProps } from './Tag.types';

export const TagGrid: FC<TagGridDataProps> = ({
  tags,
}: {
  tags: ExperienceTag[];
}) => {
  return (
    <>
      <HStack spacing={2} p={2}>
        {tags &&
          tags.map((item, index) => {
            return (
              <CategoryTag
                key={index}
                tag={item['tags']['tag']}
                add={false}
                close={false}
              />
            );
          })}
      </HStack>
    </>
  );
};
