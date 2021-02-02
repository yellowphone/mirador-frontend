import React, { useState } from "react"
import { Box, Container, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center } from '@chakra-ui/react'

export const ItineraryBuilder = () => {

    const [obj, setObj] = useState([
        {
            date: 'March 20, 2020',
            content: []
        },
        {
            date: 'March 21, 2020',
            content: []
        },
        {
            date: 'March 22, 2020',
            content: []
        },
    ]);

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
        
        // setObj({...x, content: x.content.push(e.dataTransfer.getData("text"))})
        // setObj(obj => obj[date].push(e.dataTransfer.getData("text")))
    }


    return (
        <>
            <Accordion allowToggle>

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