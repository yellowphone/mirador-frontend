import React from 'react';
import { useEffect } from 'react';
import { Input, Box } from '@chakra-ui/react';
import debounce from 'lodash/debounce'

import './Search.css'

export const Search = () => {

    const loadScript = (d: Document, cb: () => void, onError: () => void) => {
        const element = d.getElementsByTagName('script')[0]
        const fjs = element
        let js = element
        js = d.createElement('script')
        js.id = 'google-maps-key'
        js.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.MAPS_API_KEY}&libraries=places`
        if (fjs && fjs.parentNode) {
            fjs.parentNode.insertBefore(js, fjs)
        } else {
            d.head.appendChild(js)
        }
        js.onload = cb
        js.onerror = onError
    }

    useEffect(() => {
        loadScript(document, () => {
            console.log("loaded!")
        }, () => {
            console.log("error!")
        })
    })

    const onChange = <P extends keyof Search>(props: P, value: Search[P]) => {
        const autocomplete = new google.maps.places.Autocomplete(value);
        autocomplete.setFields(["address_components", "geometry", "icon", "name"]);
        autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
            console.log(place);
        })
    }

    const debounceOnChange = debounce(searchQuery => {
        onChange('query', searchQuery)
    }, 600)

    type Search = {
        query: HTMLInputElement;
    }


    return (
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
