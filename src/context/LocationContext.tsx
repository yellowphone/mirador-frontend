import React, {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';
import { LatLng } from '../types/global';

export type LocationContextInterface = {
  coords: LatLng;
  setCoords: Dispatch<SetStateAction<LatLng>>;
};
const initialState: LocationContextInterface = {
  coords: { lat: 0, lng: 0 },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setCoords: () => {},
};
export const LocationContext = createContext<LocationContextInterface>(
  initialState
);

export const LocationProvider = ({
  children,
}: PropsWithChildren<unknown>): React.ReactElement => {
  const [coords, setCoords] = useState(initialState.coords);

  const value = useMemo(
    () => ({
      coords,
      setCoords,
    }),
    [coords]
  );
  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = (): LocationContextInterface => {
  return useContext(LocationContext);
};
