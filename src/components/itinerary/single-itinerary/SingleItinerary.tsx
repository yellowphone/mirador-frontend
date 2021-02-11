import React, { FC } from "react"
import { NavigationBar } from "../../shared/navigation-bar/NavigationBar"
import { SingleItineraryProps } from "./SingleItinerary.types"

export const SingleItinerary: FC<SingleItineraryProps> = ({ data }) => {
    return (
        <>
            <NavigationBar />
            <p>Itinerary!!!</p>
            <p>pkitinerary: {data["findItineraryById"].pkitinerary}</p>
            <p>title: {data["findItineraryById"].title}</p>
        </>
    )
}