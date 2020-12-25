import React from 'react';
import { FC, useEffect, useState } from 'react';
import { Input, Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce'

import './Search.css'

interface ISearchDataProps {
    setCoords: Function
    refetch: any
}

export const Search = ({ setCoords, refetch }: ISearchDataProps) => {

    const onChange = <P extends keyof Search>(props: P, value: Search[P]) => {
        const autocomplete = new google.maps.places.Autocomplete(value);
        autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
        autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
            setCoords({lat: place.geometry?.location.lat(), lng: place.geometry?.location.lng()})
            // Refetch potentially new data anytime a search occurs
            refetch();
        })
    }

    const debounceOnChange = debounce(searchQuery => {
        onChange('query', searchQuery)
    }, 500)

    type Search = {
        query: HTMLInputElement;
    }

    return(
        <div>
            <div>
                <div>
                    <Box maxW='100%'>
                        <Input placeholder={'Enter a location'} onChange={e => {
                            debounceOnChange(e.target)
                        }}></Input>
                    </Box>
                </div>
            </div>
        </div>
    );

}
