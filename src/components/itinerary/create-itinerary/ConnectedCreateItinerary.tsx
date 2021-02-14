import React from 'react'
import { useHistory } from 'react-router-dom';
import { CreateItinerary } from './CreateItinerary'

export const ConnectedCreateItinerary = () => {

    const history = useHistory();

    return (
        <>
            <CreateItinerary history={history}/>
        </>
    )
}