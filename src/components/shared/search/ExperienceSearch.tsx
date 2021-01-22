import React, { useState, FC } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_EXPERIENCE_BY_TITLE } from '../../../graphql/queries/experienceQuery';
import { Input, Box, Button, Link } from '@chakra-ui/react';
import debounce from 'lodash/debounce'

interface ExperienceSearchDataProps {
    addContent: Function
}

export const ExperienceSearch: FC<ExperienceSearchDataProps> = ({ addContent }) => {

    const [ title, setTitle ] = useState("");

    const [ findExperienceByTitle, { called, loading, data }] = useLazyQuery(FIND_EXPERIENCE_BY_TITLE, {
        variables: { title: title }
    });

    return (
        <>
        <Input type="text" placeholder="Search an experience" onChange={e => setTitle(e.target.value)}></Input>
        { data && data["findExperienceByTitle"].map((c: any, i: number) => <div onClick={() => addContent("experience", c["pkexperience"])} key={i}>{c["title"]}</div>)}
        <Button onClick={() => findExperienceByTitle()} >Search</Button>
        </>
    )
}