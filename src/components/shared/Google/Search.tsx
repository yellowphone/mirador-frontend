import React, { Dispatch, SetStateAction } from 'react';
import { Input, Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce';
import { Loader } from '@googlemaps/js-api-loader';
import './Search.css';
import { LatLng } from '../../../types/global';
import { ApolloQueryResult } from '@apollo/client';

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
  const onChange = <P extends keyof Search>(props: P, value: Search[P]) => {
    loader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(value);
      autocomplete.setFields([
        'address_components',
        'geometry',
        'icon',
        'name',
      ]);
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        setCoords({
          lat: place.geometry?.location.lat() || 0,
          lng: place.geometry?.location.lng() || 0,
        });
        // Refetch potentially new data anytime a search occurs
        if (refetch) {
          refetch();
        }
      });
    });
  };

  const debounceOnChange = debounce(searchQuery => {
    onChange('query', searchQuery);
  }, 500);

  type Search = {
    query: HTMLInputElement;
  };

  return (
    <div>
      <div>
        <div>
          <Box maxW="100%">
            <Input
              placeholder={'Enter a location'}
              onChange={e => {
                debounceOnChange(e.target);
              }}
            ></Input>
          </Box>
        </div>
      </div>
    </div>
  );
};
