import React, { useState, FC } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_EXPERIENCE_BY_TITLE } from '../../../graphql/queries/experienceQuery';
import { Input, Button } from '@chakra-ui/react';
interface ExperienceSearchDataProps {
  addContent: (type: string, content: string) => void;
}

interface ExperienceByTitleDataProps {
  pkexperience: number;
  title: string;
  public_identifier: string;
}

export const ExperienceSearch: FC<ExperienceSearchDataProps> = ({
  addContent,
}) => {
  const [title, setTitle] = useState('');

  const [findExperienceByTitle, { data }] = useLazyQuery(
    FIND_EXPERIENCE_BY_TITLE,
    {
      variables: { title: title },
    }
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Search an experience"
        onChange={e => setTitle(e.target.value)}
      ></Input>
      {data &&
        data['findExperienceByTitle'].map(
          (c: ExperienceByTitleDataProps, i: number) => (
            <div
              onClick={() => addContent('experience', c['public_identifier'])}
              key={i}
            >
              {c['title']}
            </div>
          )
        )}
      <Button onClick={() => findExperienceByTitle()}>Search</Button>
    </>
  );
};
