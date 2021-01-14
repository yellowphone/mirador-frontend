import React, { FC } from "react";
import { useQuery } from '@apollo/react-hooks';

import { FIND_EXPERIENCE_BY_ID } from '../../../graphql/queries/experienceQuery';

import { ConnectedSingleExperienceProps } from './SingleExperience.type'
import { SingleExperience } from './SingleExperience'

export const ConnectedSingleExperience: FC<ConnectedSingleExperienceProps> = ({ history }) => {
    
    const { data, loading, error, refetch } = useQuery(FIND_EXPERIENCE_BY_ID, {
        variables: { pkexperience: history.location.state.pkexperience }
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