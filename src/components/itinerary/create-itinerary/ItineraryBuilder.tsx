import React, { useState } from "react"
import { useForm } from "react-hook-form";
import { Box, Button, Container, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center, Input, Text } from '@chakra-ui/react'
import { useMutation } from "@apollo/client";
import { CREATE_ITINERARY } from "../../../graphql/mutations/itineraryMutation";
import { Paths } from "../../../utils/paths";

export const ItineraryBuilder = ({ title, history }) => {

    const [obj, setObj] = useState([]);

    const [ createItinerary, { data }] = useMutation(CREATE_ITINERARY)

    const handleDragOver = (e: any) => {
        e.preventDefault();
    }

    const handleDragDrop = (e, date) => {
        console.log(e.dataTransfer.getData("text"))
        const index = obj.findIndex(element => element.date == date)
        console.log(index)
        let newObj = [...obj]
        newObj[index].content.push(e.dataTransfer.getData("text"))
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
                pkuser: 1
            }
        }).then(data => {
            console.log(data)
            history.push(Paths.SingleItinerary, { pkitinerary: data.data["createItinerary"]["pkitinerary"] })
        })
    }

    const { register, handleSubmit, errors } = useForm();

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
                        obj.map((item) => {
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
                                                    item.content.map(innerItems => {
                                                        return (
                                                            <div>{innerItems}</div>
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