import GoogleMapReact from 'google-map-react';
import React, { FC, useCallback, useEffect } from 'react';

const center = {
    lat: 37.223454,
    lng: -80.424
}

interface IMapDataProps {
    width: number,
    height: number,
}

export const Map: FC<IMapDataProps> = ({ height, width }) => {

    return (
        <div style={{ height, width }}>
            <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.MAPS_API_KEY ?? '' }}
            defaultCenter={center}
            defaultZoom={15}
            ></GoogleMapReact>
      </div>
    );
}