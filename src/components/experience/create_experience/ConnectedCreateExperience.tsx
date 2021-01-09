import React, { useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_EXPERIENCE } from '../../../graphql/mutations/experienceMutation';
import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { CreateExperience } from './CreateExperience'
import { Loader } from '@googlemaps/js-api-loader';


export const ConnectedCreateExperience = () => {

    const [createCoords, setCreateCoords] = useState({lat: 0, lng: 0});

    const [ createExperience, { data }] = useMutation(CREATE_EXPERIENCE);

    const history = useHistory();

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const onSubmit = (input: any) => {   
        console.log(input)
        createExperience({
            variables: {
                title: input["title"],
                summary: input["summary"],
                miles: parseFloat(input["miles"]),
                elevation: parseInt(input["elevation"]),
                difficulty: input["difficulty"],
                pkuser: 1,
                lat: createCoords["lat"], 
                lng: createCoords["lng"]
            }
        }).then(data => {
            history.push(Paths.SingleExperience, { pkexperience: data.data["createExperience"]["pkexperience"] });
        })
    };

    return (
        <>
            <CreateExperience onSubmit={onSubmit} setCreateCoords={setCreateCoords} loader={loader} />
        </>
    )
}
