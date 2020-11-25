import { GoogleMap, LoadScript } from '@react-google-maps/api';
import React, { FC } from 'react';

const center = {
    lat: 37.223454,
    lng: -80.424
}

interface IMapDataProps {
    width: number,
    height: number,
}

export const Map: FC<IMapDataProps> = ({ height, width }) => {
    const containerStyle = {
        width: `${width}px`, // it is only half the width
        height: `${height}px`, // 
    }
    
    const key: string = process.env.MAPS_API_KEY ?? '';
    return (
        <h1>Map will go here</h1>
    );
}