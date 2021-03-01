import React, { FormEvent, useState } from "react";
import { useMutation } from '@apollo/react-hooks';
import { CREATE_EXPERIENCE } from '../../../graphql/mutations/experienceMutation';
import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { CreateExperience } from './CreateExperience'
import { Loader } from '@googlemaps/js-api-loader';
import { useCookies } from 'react-cookie';

export const ConnectedCreateExperience = () => {

    const [cookie, setCookie] = useCookies(['user'])
    console.log(cookie["user"]["pkuser"])
    const [createCoords, setCreateCoords] = useState({lat: 0, lng: 0});

    const [ files, setFiles ] = useState([]);

    const [ createExperience, { data }] = useMutation(CREATE_EXPERIENCE);

    const [ addedTags, setAddedTags ] = useState<Object[]>([]);

    const history = useHistory();

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const onUploadInputChange = (e: FormEvent<HTMLInputElement>) => {
        setFiles(files => [...files, e.target.files])
    }

    const onSubmit = (input: any) => {   
        console.log(input)
        var tags: number[] = [];
        addedTags.map((item: number) => {
            tags.push(item.pktag)
        })
        createExperience({
            variables: {
                title: input["title"],
                summary: input["summary"],
                miles: parseFloat(input["miles"]),
                elevation: parseInt(input["elevation"]),
                difficulty: input["difficulty"],
                pkuser: cookie["user"]["pkuser"],
                lat: createCoords["lat"], 
                lng: createCoords["lng"],
                tags: tags,
                images: files
            }
        }).then(data => {
            history.push(Paths.SingleExperience, { pkexperience: data.data["createExperience"]["pkexperience"] });
        })
    };

    return (
        <>
            <CreateExperience onSubmit={onSubmit} setCreateCoords={setCreateCoords} loader={loader} setAddedTags={setAddedTags} addedTags={addedTags} onUploadInputChange={onUploadInputChange} />
        </>
    )
}
