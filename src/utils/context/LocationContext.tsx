/* eslint-disable @typescript-eslint/no-empty-function */
import { Loader } from '@googlemaps/js-api-loader';
import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactElement,
  SetStateAction,
  useContext,
  useState,
} from 'react';

require('dotenv').config();

export type LatLng = {
  lat: number;
  lng: number;
};

type LocationContextInterface = {
  coords: LatLng;
  loader: Loader;
  setCoords: Dispatch<SetStateAction<LatLng>>;
};

const initialState = {
  coords: { lat: 0, lng: 0 },
  loader: new Loader({
    apiKey: `${process.env.REACT_APP_MAPS_API_KEY}`,
    version: 'weekly',
    libraries: ['places', 'geometry'],
  }),
  setCoords: () => {},
};

export const LocationContext =
  createContext<LocationContextInterface>(initialState);

export const LocationContextWrapper = ({
  children,
}: PropsWithChildren<Record<string, unknown>>): ReactElement => {
  const [coords, setCoords] = useState(initialState.coords);
  return (
    <LocationContext.Provider
      value={{
        ...initialState,
        coords,
        setCoords,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextInterface => {
  return useContext(LocationContext);
};
