import { Box, Container, Flex, Accordion, AccordionItem, AccordionButton, AccordionIcon, AccordionPanel, Heading, Center } from '@chakra-ui/react'
import React, { useState } from 'react'
import { Map } from '../../shared/Google/Map'
import { Loader } from '@googlemaps/js-api-loader';
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar'
import { ItineraryBuilder } from './ItineraryBuilder';
import { IExperience } from '../../experience/Experience.types';
import { useQuery } from '@apollo/react-hooks';
import { FIND_EXPERIENCE_BY_COORDINATES } from '../../../graphql/queries/experienceQuery';
import { Search } from '../../shared/Google/Search';

const leftSideStyle = {
    scroll: 'none'
}

const rightSideStyle = {
    scroll: 'none'
    // position: 'fixed', // need to get the map to be fixed to the right
}

export const CreateItinerary = () => {

    const [coords, setCoords] = useState({lat:37.235961, lng: -80.607775});

    const [title, setTitle] = useState("New Itinerary");

    // const handleDragStart = (e, text) => {
    //     console.log(text)
    //     e.dataTransfer.setData("text", text)
    // }

    const loader = new Loader({
        apiKey: `${process.env.MAPS_API_KEY}`,
        version: "weekly",
        libraries: ["places", "geometry"]
    });

    const { data: experienceItems, loading, error, refetch } = useQuery(FIND_EXPERIENCE_BY_COORDINATES, {
        variables: { lat: coords["lat"], lng: coords["lng"] },
    });

    if (loading) {
        return <h1>Loading</h1>
    }
    if (error) {
        console.error(error)
        return <h1>Error!</h1>
    }

    const experienceList: Array<IExperience> = experienceItems?.findExperienceByCoordinates?.map((item: IExperience) => {
        return {
            fk_experience_location: item.fk_experience_location,
            imageUrl: "http://www.citrusmilo.com/acadia/joebraun_precipice27.jpg",
            imageAlt: "ok",
            miles: item.miles,
            elevation: item.elevation,
            title: item.title,
            summary: item.summary,
            rating: 4,
            lat: item.lat,
            lng: item.lng,
            difficulty: item.difficulty
        }
    })

    /**
     * TODO for itinerary (one step at a time!)
     * ☑ Get a drag and drop with components working and saving correctly on json (basic version)
     * - Able to save experiences to an itinerary
     * - Pass experiences to map in itinerary and populate map, reset the center!
     *       - (probably create some kind of interface for map, since it's just for many different types)
     * ☑ Search component for map
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
                    <Search setCoords={setCoords} loader={loader} refetch={() => {}}/>
                    <Map width={7 * (screen.width / 10)} height={screen.height - 230} loader={loader} coords={coords} experiences={experienceList} infoWindow={true} />
                </Box>
                <Box css={rightSideStyle} maxW='30%' width={3 * (screen.width / 10)}>
                    <ItineraryBuilder/>
                </Box>

                {/* <div draggable onDragStart={(e) => {handleDragStart(e, "hello")}}>Hello World</div> */}
                
            </Flex>
        </>
    )
}