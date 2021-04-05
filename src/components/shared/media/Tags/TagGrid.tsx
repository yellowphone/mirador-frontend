import React, { FC } from 'react';
import { TagGridDataProps } from './Tag.types';
import { CategoryTag } from './CategoryTag';
import { HStack } from '@chakra-ui/react';
import { TSFixMe } from '../../../../types/global';

export const TagGrid: FC<TagGridDataProps> = ({
  tags,
}: {
  tags: TSFixMe[];
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
