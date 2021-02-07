import { Grid } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IExperience } from '../../experience/Experience.types';
import { Card } from '../card/Card';
import { CardsGridDataProps } from './CardsGrid.types';
import { FIND_ITINERARIES_FOR_USER } from "../../../graphql/queries/itineraryQuery";
import { useQuery } from "@apollo/client";

export const CardsGrid: FC<CardsGridDataProps<IExperience>> = ({
    list
}) => {

    const { data, loading, error, refetch } = useQuery(FIND_ITINERARIES_FOR_USER, {
        variables: { pkuser: 1 },
    });

    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    return (
        <Grid pt='5' templateColumns="repeat(2, 1fr)" gap={6}>
            {
                list.map(i => {
                    return <Card key={i["title"]} experience={i} userItineraries={data} />
                })
            }
        </Grid>
    )
};