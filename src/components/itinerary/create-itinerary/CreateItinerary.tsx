import { Box, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel } from '@chakra-ui/react'
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

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

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
     */

    return (
        <>
            <NavigationBar />
            <Flex>
                <Box css={leftSideStyle} maxW='70%' width={7 * (screen.width / 10)}>
                    <Map width={7 * (screen.width / 10)} height={screen.height - 230} loader={loader} coords={coords} experiences={[]}/>
                </Box>
                <Box css={rightSideStyle} maxW='30%' width={3 * (screen.width / 10)}>
                    <Accordion allowToggle>
                        <AccordionItem>
                            <AccordionButton>
                            <Box flex="1" textAlign="left">
                                March 4th, 2020
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                            <Box flex="1" textAlign="left">
                                March 5th, 2020
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                            <Box flex="1" textAlign="left">
                                March 6th, 2020
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem>
                            <AccordionButton>
                            <Box flex="1" textAlign="left">
                                March 7th, 2020
                            </Box>
                            <AccordionIcon />
                            </AccordionButton>
                            <AccordionPanel pb={4}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                            commodo consequat.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>
            </Flex>
        </>
    )
}