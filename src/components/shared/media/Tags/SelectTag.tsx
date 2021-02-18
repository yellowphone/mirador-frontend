import { useLazyQuery, useQuery } from "@apollo/client"
import { Button, Box, Wrap, WrapItem, Center } from "@chakra-ui/react"
import { Form } from 'react-bootstrap';
import React, { useEffect, useState, FC } from "react"
import { GET_TAGS } from "../../../../graphql/queries/tagQuery"
import { CategoryTag } from "./CategoryTag";

interface SelectTagProps {
    setAddedTags: Function
    addedTags: Object[]
}

export const SelectTag: FC<SelectTagProps> = ({ setAddedTags, addedTags }) => {

    const [ open, setOpen ] = useState(false);

    const [ tags, setTags ] = useState<Object[]>([]);

    const { data, loading, error } = useQuery(GET_TAGS);

    useEffect(() => {
        if (data && data["getTags"]) {
            setTags(data["getTags"])
        }
    }, [data])

    if (loading) {
        console.log("Loading...")
    }

    if (error) {
        console.error(error)
    }

    const onClose = ( tag: string, pktag: number ) => {
        setAddedTags(addedTags.filter(item => item.tag !== tag))
        setTags([...tags, {
            tag: tag, 
            pktag: pktag
        }])
    }

    const onAdd = (tag: string, pktag: number) => {
        setTags(tags.filter(item => item.tag !== tag))
        setAddedTags([...addedTags, {
            tag: tag, 
            pktag: pktag
        }])
    }
    

    return (
        <> 
        <Box maxW="md" borderWidth="1px" borderRadius="lg">
            <Wrap>
            { addedTags && addedTags.map((item: Object, index: number) => {
                return (
                    <WrapItem onClick={() => onClose(item.tag, item.pktag)} key={index}>
                        <CategoryTag tag={item.tag} add={false} close={true}/>
                    </WrapItem>
                )
            })}
            </Wrap>
        </Box>

        {/* make it prettier, where there's an input and a plus sign on the right, onclick plus sign opens tags */}

        <Button m={2} onClick={() => {
            setOpen(!open)
        }}>Add a tag</Button>

        { open && <>
            <Box maxW="sm" m={2}>
                <Wrap justify="center">
                    {tags &&  tags.map((item: Object, index: number) => {
                        return (
                            <WrapItem onClick={() => onAdd(item.tag, item.pktag)} key={index}>
                                <CategoryTag tag={item.tag} add={true} close={false}/>
                            </WrapItem>
                        )
                    })}
                </Wrap>
            </Box>
        </>}
            
        </>
    )
}