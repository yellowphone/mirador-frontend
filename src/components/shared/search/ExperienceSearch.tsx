import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import { FIND_EXPERIENCE_BY_TITLE } from '../../../graphql/queries/experienceQuery';
import { Input, Box, Button, Link } from '@chakra-ui/react';
import debounce from 'lodash/debounce'

export const ExperienceSearch = () => {

    const [ title, setTitle ] = useState("");

    const [ results, setResults ] = useState(null);

    const [ findExperienceByTitle, { called, loading, data }] = useLazyQuery(FIND_EXPERIENCE_BY_TITLE, {
        variables: { title: title }
    });

    // const [ data, setData ] = useState([]);

    // const onChange = (value) => {

    // }

    // const debounceOnChange = debounce(searchQuery => {
    //     onChange(searchQuery)
    // }, 500)

    // if (called && loading) return <p>Loading ...</p>;

    return (
        <>
        {/* <Input placeholder={'Find an experience'} onChange={e => {
            debounceOnChange(e.target)
        }}></Input> */}
        <Input type="text" onChange={e => setTitle(e.target.value)}></Input>
        <Button onClick={() => {
                findExperienceByTitle()
            }
        } />

        { data && data["findExperienceByTitle"].map((c, i) => <div key={i}>{c["title"]}</div>)}
        


        </>
    )
}