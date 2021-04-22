import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Input, Box } from '@chakra-ui/react';
import { Loader } from '@googlemaps/js-api-loader';
import './Search.css';
import { LatLng } from '../../../types/global';
import { ApolloQueryResult } from '@apollo/client';
import { useDebounce } from 'react-use';

interface ISearchDataProps {
  setCoords: Dispatch<SetStateAction<LatLng>>;
  refetch?: (variables?: Partial<LatLng>) => Promise<ApolloQueryResult<never>>;
  loader: Loader;
}

export const Search = ({
  setCoords,
  refetch,
  loader,
}: ISearchDataProps): React.ReactElement => {
  const autocompleteRef = useRef<HTMLInputElement>(null);
  const [location, setLocation] = useState('');
  const [, setDebouncedLocation] = useState('');
  const [autocomplete, setAutocomplete] = useState<
    google.maps.places.Autocomplete | undefined
  >();

  useEffect(() => {
    if (autocompleteRef.current) {
      loader.load().then(() => {
        setAutocomplete(
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          new google.maps.places.Autocomplete(autocompleteRef.current!)
        );
      });
    }
  }, [loader]);

  useEffect(() => {
    if (autocomplete) {
      autocomplete.setFields([
        'address_components',
        'geometry',
        'icon',
        'name',
      ]);

      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();

        // @TODO: this for some reason refreshes the whole component which is kind of meh. we'd like it to persist.
        setCoords({
          lat: place.geometry?.location.lat() || 0,
          lng: place.geometry?.location.lng() || 0,
        });
        if (refetch) refetch();
      });
    }
  }, [autocomplete, refetch, setCoords]);

  const onChange = (event: { target: HTMLInputElement }) => {
    setLocation(event.target.value);
  };

  useDebounce(
    () => {
      setDebouncedLocation(location);
    },
    500,
    [location]
  );

  return (
    <div>
      <div>
        <div>
          <Box maxW="100%">
            <Input
              placeholder={'Enter a location'}
              onChange={event => {
                onChange(event);
              }}
              ref={autocompleteRef}
              value={location}
            />
          </Box>
        </div>
      </div>
    </div>
  );
};
