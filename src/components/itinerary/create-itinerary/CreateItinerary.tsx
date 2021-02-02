import { Box, Container, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Map } from '../../shared/Google/Map'
import { Loader } from '@googlemaps/js-api-loader';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar'

const leftSideStyle = {
    scroll: 'none'
}

const rightSideStyle = {
    scroll: 'none'
    // position: 'fixed', // need to get the map to be fixed to the right
}

export const CreateItinerary = () => {

    const [coords, setCoords] = useState({lat: 44.349483, lng: -68.187912});

    const [title, setTitle] = useState("New Itinerary");

    // const [obj, setObj] = useState({
    //     "March 20, 2020": [],
    //     "March 21, 2020": [],
    //     "March 22, 2020": []
    // });

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

    const handleDragStart = (e, text) => {
        console.log(text)
        e.dataTransfer.setData("text", text)
    }

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    /**
     * TODO for itinerary (one step at a time!)
     * - Get a drag and drop with components working and saving correctly on json (basic version)
     * - Able to save experiences to an itinerary
     * - Pass experiences to map in itinerary and populate map, reset the center!
     *       - (probably create some kind of interface for map, since it's just for many different types)
     * - Search component for map
     */

    /**
     * NOTES:
     * 
     * - Need a title section at top (title may already exist)
     * - Add search bar on the top left where users can search/filter new experiences
     * - Have all saved experiences from this itinerary on the map (in a specific color) (if clicked, an infowindow appears)
     * - Need a section for "dates" option (or a list option for everything) on the right
     *       - When a user selects dates, it will auto create an accordion (or something like that)
     *       - Have a "time option" on the top near accordion, so it adds timetable or not on accordion
     *       - If no dates are chosen, just have a list option
     * - Able to freely add things to accordion as well (add button on bottom)
     * - Figure out how to save this into db!! I am thinking JSON obj, where accordion will iterate through json and render
     * - Whenever you try to save an experience, popup to save to itinerary (either your default or you can create one!)
     * - When you go to specific itinerary, have experiences popup in map, and if clicked, infowindow appears! drag and drop on those components
     */

    return (
        <>
            <NavigationBar />
            <Flex>
                {/* <Container maxW="xl" centerContent>
                    <Box maxW='100%' width={screen.width}>
                            <Heading>{title}</Heading>
                    </Box>
                </Container> */}

                <Box css={leftSideStyle} maxW='70%' width={7 * (screen.width / 10)}>
                    <Map width={7 * (screen.width / 10)} height={screen.height - 230} loader={loader} coords={coords} experiences={[]}/>
                </Box>
                <Box css={rightSideStyle} maxW='30%' width={3 * (screen.width / 10)}>
                    <Accordion allowToggle>

                        {/* Build a component for this segment, for the actual itinerary part, keep json on this level */}
                        
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
                    <div draggable onDragStart={(e) => {handleDragStart(e, "hello")}}>Hello World</div>
                </Box>
                
            </Flex>
        </>
    )
}