import React, { FC, useEffect, useState } from "react";
import { useQuery } from '@apollo/react-hooks';

import { FIND_EXPERIENCE_BY_ID, FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER } from '../../../graphql/queries/experienceQuery';

import { ConnectedSingleExperienceProps } from './SingleExperience.type'
import { SingleExperience } from './SingleExperience'

import { useLocation } from "react-router-dom";

export const ConnectedSingleExperience: FC<ConnectedSingleExperienceProps> = ({ history }) => {

    const location = useLocation();

    const [ identifier, setIdentifier ] = useState("");

    useEffect(() => {
        console.log(location.pathname)
        console.log(location.pathname.split('/')[2])
        setIdentifier(location.pathname.split('/')[2]);
    }, [])
    
    const { data, loading, error, refetch } = useQuery(FIND_EXPERIENCE_BY_PUBLIC_IDENTIFIER, {
        variables: { public_identifier: location.pathname.split('/')[2] }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    return(
        <>
            <SingleExperience data={data} />
        </>
    )
}