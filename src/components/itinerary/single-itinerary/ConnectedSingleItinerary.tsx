import { useQuery } from "@apollo/client"
import React, { FC } from "react"
import { FIND_ITINERARY_BY_ID } from "../../../graphql/queries/itineraryQuery"
import { SingleItinerary } from "./SingleItinerary"
import { ConnectedSingleItineraryProps } from "./SingleItinerary.types"

export const ConnectedSingleItinerary: FC<ConnectedSingleItineraryProps> = ({ history }) => {

    const { data, loading, error, refetch } = useQuery(FIND_ITINERARY_BY_ID, {
        variables: { pkitinerary: history.location.state.pkitinerary }
    })

    if (loading) {
        return <h1>Loading</h1>
    }

    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    console.log(data)

    return (
        <>
            <SingleItinerary data={data["findItineraryById"]}/>
        </>
    )
}