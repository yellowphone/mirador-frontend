import { Box, Container, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar'
import { ItineraryBuilder } from './ItineraryBuilder';
import { ItinerarySearcher } from './ItinerarySearcher';

const leftSideStyle = {
    scroll: 'none'
}

const rightSideStyle = {
    scroll: 'none'
    // position: 'fixed', // need to get the map to be fixed to the right
}

/**
 * This component is to create an itinerary entirely from scratch
 */
export const CreateItinerary = ({ history }) => {

    const [title, setTitle] = useState("New Itinerary");

    /**
     * TODO for itinerary (one step at a time!)
     * ☑ Get a drag and drop with components working and saving correctly on json (basic version)
     * ☑ Able to save experiences to an itinerary
     * - Pass experiences to map in itinerary and populate map, reset the center! (for edit itinerary)
     *       - (probably create some kind of interface for map, since it's just for many different types)
     * ☑ Search component for map
     * - Able to create itinerary through "save" on card
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
                    <ItinerarySearcher/>
                </Box>
                <Box css={rightSideStyle} maxW='30%' width={3 * (screen.width / 10)}>
                    <ItineraryBuilder title={title} history={history}/>
                </Box>
                
            </Flex>
        </>
    )
}