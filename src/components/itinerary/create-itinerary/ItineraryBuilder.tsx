import React, { useState, FC } from "react"
import { useForm } from "react-hook-form";
import { Box, Button, Container, Flex, Image, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center, Input, Text } from '@chakra-ui/react'
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ITINERARY } from "../../../graphql/mutations/itineraryMutation";
import { Paths } from "../../../utils/paths";
import { ItineraryBuilderProps } from "./CreateItinerary.types"
import { useCookies } from 'react-cookie';

export const ItineraryBuilder: FC<ItineraryBuilderProps> = ({ title, history }) => {

    const [cookie, setCookie] = useCookies(['user'])
    
    const [obj, setObj] = useState<Object[]>([]);

    const [ createItinerary, { data }] = useMutation(CREATE_ITINERARY)

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    const { register, handleSubmit, errors } = useForm();

    const handleDragDrop = (e: React.DragEvent<HTMLDivElement>, date: String) => {
        const index = obj.findIndex(element => element.date == date)
        let newObj = [...obj]
        // add css for experience card
        newObj[index].content.push(e.dataTransfer.getData("element"))
        setObj(newObj)
    }

    const onItineraryCreate = (input: any) => {

        if (input["start"] <= input["end"]) {

            var start = new Date(input["start"]), end = new Date(input["end"])
            start.setDate(start.getDate() + 1)
            end.setDate(end.getDate() + 1)
            for (start; start <= end; start.setDate(start.getDate() + 1)) {
                var newDate = new Date(start)
                var month = ('0' + (newDate.getMonth() + 1).toString()).slice(-2), day = ('0' + (newDate.getDate().toString())).slice(-2), year = (newDate.getFullYear().toString())
                setObj(obj => [...obj, {date: `${month}/${day}/${year}`,content: []}])
            }
        }
        else {
            alert("Date range is not valid! Try again!")
        }
        console.log(input)
    }

    const onSubmit = () => {
        createItinerary({
            variables: {
                title: title,
                summary: "",
                content: {
                    content: obj
                },
                pkuser: cookie["user"]["pkuser"]
            }
        }).then(data => {
            console.log(data)
            history.push(Paths.SingleItinerary, { pkitinerary: data.data["createItinerary"]["pkitinerary"] })
        })
    }

    if (obj.length == 0) {
        return (
            <>
                <Center>
                    <form onSubmit = { handleSubmit(onItineraryCreate) }>
                        <Center>
                            <Text>Please select your trip start and end date</Text>
                        </Center>
                        <Input type="date" name="start" ref={register}/>
                        <Input type="date" name="end" ref={register}/>
                        <Button type="submit">Submit</Button>
                    </form>
                </Center>
            </>
        )
    }
    else {
        return (
            <>
                <Accordion allowToggle>
                    <Center>
                        <Heading>Your Trip</Heading>
                    </Center>
                    <Center>
                        <form onSubmit = { handleSubmit( onSubmit )}>
                            <Button type="submit">Create Itinerary</Button>
                        </form>
                    </Center>
                    <br></br>
    
                    {
                        obj.map((item: Object) => {
                            return (
                                <AccordionItem>
                                    <AccordionButton>
                                        <Box flex="1" textAlign="left">
                                            {item["date"]}
                                        </Box>
                                    </AccordionButton>
                                    <div pb={4} onDragOver={(e) => handleDragOver(e)}
                                        onDrop={(e) => handleDragDrop(e, item["date"])}>
                                            <AccordionPanel>
                                                {
                                                    // Might need to render with {} in array, so it knows what kind of type it is
                                                    item.content.map((innerItems: string) => {
                                                        var innerItineraryElement = JSON.parse(innerItems);
                                                        return (
                                                            <Box borderWidth="1px" borderRadius="lg" maxW="sm">
                                                                <Image src={innerItineraryElement.imgUrl} alt={innerItineraryElement.imgAlt} htmlWidth="50%"/>
                                                                <Box
                                                                    mt="1"
                                                                    fontWeight="semibold"
                                                                    as="h4"
                                                                    lineHeight="tight"
                                                                    >
                                                                    {innerItineraryElement.title}
                                                                </Box>
                                                            </Box>
                                                        )
                                                    })
                                                }
                                        </AccordionPanel>
                                        </div>
                                </AccordionItem>
                            )
                        })
                    }
    
                </Accordion>
            </>
        )
    }
}