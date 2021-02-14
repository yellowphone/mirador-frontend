import { Grid } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IExperience } from '../../experience/Experience.types';
import { Card } from '../card/Card';
import { CardsGridDataProps } from './CardsGrid.types';

export const CardsGrid: FC<CardsGridDataProps<IExperience>> = ({
    list
}) => {

    return (
        <Grid pt='5' templateColumns="repeat(2, 1fr)" gap={6}>
            {
                list.map(i => {
                    return <Card key={i["title"]} experience={i} />
                })
            }
        </Grid>
    )
};