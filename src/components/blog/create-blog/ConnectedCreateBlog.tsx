import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks'
import { CREATE_BLOG } from '../../../graphql/mutations/blogMutation';
import { useHistory } from 'react-router-dom';
import { CreateBlog } from './CreateBlog';
import { Paths } from '../../../utils/paths';
import { Loader } from '@googlemaps/js-api-loader';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard';
import { SimpleGrid, Center, Text, Image, } from "@chakra-ui/react"
import { useCookies } from 'react-cookie';
import { NoLogin } from '../../shared/no-login/NoLogin';
import { CREATE_MONGODB_BLOG, INSERT_ELEMENT_INTO_BLOG } from '../../../graphql/mutations/mongodbMutation';
import { ElementDataProps } from '../Blog.types';
import { TSFixMe } from '../../../types/global';
import { mongodbClient } from '../../../graphql/mongodbClient';
import { Tag } from '../../shared/media/Tags/Tag.types';

export const ConnectedCreateBlog = () => {
    
    const [cookie, setCookie] = useCookies(['user'])

    const [createCoords, setCreateCoords] = useState({lat: 0, lng: 0});

    const [mongoID, setMongoID] = useState("");

    const [ addedTags, setAddedTags ] = useState<Tag[]>([]);

    const [ createBlog, { data }] = useMutation(CREATE_BLOG);

    const [ createMongoBlog, { data: mongoData }] = useMutation(CREATE_MONGODB_BLOG, { 
        client: mongodbClient
    });

    const [ insertElement ] = useMutation(INSERT_ELEMENT_INTO_BLOG, {
        client: mongodbClient
    });

    const [ elements, setElements ] = useState<TSFixMe[]>([]);

    const history = useHistory();

    useEffect(() => {
        createMongoBlog().then(data => {
            console.log(data)
            setMongoID(data.data["createBlog"])
        })
    }, [])

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const renderElements = () => {
        return elements.map((element: ElementDataProps, index: number) => {
            switch(element["type"]) {
                case "image":
                    return <Image key={index} src={element["content"]} />
                case "text":
                    return <Text key={index}>{element["content"]}</Text>
                case "experience":
                    return <Center key={index}><BlogExperienceCard public_identifier={element["content"]}/></Center>
            }
        })
    }

    const addElement = (type: String, content: String) => {
        // add json to state 
        setElements(elements => [...elements, { type: type, content: content }])

        // add json to mongodb
        var element = {
            type: type,
            content: content
        }
        insertElement({
            variables: {
                id: mongoID,
                element: element
            }
        })
    }

    const onSubmit = (input: { summary: string; title: string }) => {
        console.log(input)
        var tags: number[] = [];
        addedTags.map((item: Tag) => {
            tags.push(item.pktag)
        })

        createBlog({
            variables: {
                title: input["title"],
                summary: input["summary"],
                mongoid: mongoID,
                pkuser: cookie["user"]["pkuser"],
                lat: createCoords["lat"], 
                lng: createCoords["lng"],
                tags: tags
            }
        }).then(data => {
            history.push(Paths.SingleBlog + "/" + data.data["createBlog"]["public_identifier"]) 
        })
    }

    return (
        <>
            { !cookie["user"] && 
                <NoLogin />
            }
            { cookie["user"] &&
                <CreateBlog onSubmit={onSubmit} addElement={addElement} renderElements={renderElements} setCreateCoords={setCreateCoords} loader={loader} setAddedTags={setAddedTags} addedTags={addedTags}/>
            }
        </>
    )

}

