import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import React from 'react';


export const Search = () => {

    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey={process.env.MAPS_API_KEY}
                selectProps= {{
                    placeholder: 'Type a location to get started',
                }}
            />
      </div>
    );
}
