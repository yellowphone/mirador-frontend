import { Grid } from '@chakra-ui/react';
import React, { FC } from 'react';
import { IAdventure } from '../../adventure/Adventure.types';
import { Card } from '../card/Card';
import { CardsGridDataProps } from './CardsGrid.types';

export const CardsGrid: FC<CardsGridDataProps<IAdventure>> = ({
    list
}) => {
    return (
        <Grid pt='5' templateColumns="repeat(2, 1fr)" gap={6}>
            {
                list.map(i => {
                    return <Card adventure={i} />
                })
            }
        </Grid>
    )
};