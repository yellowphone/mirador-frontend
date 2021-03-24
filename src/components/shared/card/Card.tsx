import { Box, 
    Button, 
    Container, 
    Image, 
    Input,
    Spacer, 
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,  
    Table,
    Tbody, 
    Tr,
    Td, 
    useDisclosure} from "@chakra-ui/react"
import { AddIcon, CheckIcon, CloseIcon } from '@chakra-ui/icons'
import React, { FC, useCallback, useState } from "react"
import { Stars } from "../media/Stars/Stars";
import { CardDataProps } from "./Card.types";

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_EXPERIENCE_TO_ITINERARY, CREATE_ITINERARY } from "../../../graphql/mutations/itineraryMutation";
import { FIND_ITINERARIES_FOR_USER } from "../../../graphql/queries/itineraryQuery";
import { useForm } from "react-hook-form";
import { useCookies } from 'react-cookie';
    
export const Card: FC<CardDataProps> = ({
    experience
}) => {

    const {
        fk_experience_location,
        imageAlt,
        imageUrl,
        title,
        elevation,
        miles,
        rating,
        public_identifier
    } = experience
    
    const [cookie, setCookie] = useCookies(['user'])

    const history = useHistory();
    const onNavigate = useCallback((path: Paths) => {
        history.push(path + "/" + public_identifier);
    }, []);

    const [ showCreateItinerary, setShowCreateItinerary ] = useState(false); 

    const [ loadForCreateItinerary, setLoadForCreateItinerary ] = useState(false);

    const [ addExperienceToItinerary, { data: addExperienceToItineraryData }] = useMutation(ADD_EXPERIENCE_TO_ITINERARY);

    const [ createItinerary, { data: createItineraryData }] = useMutation(CREATE_ITINERARY);

    const [ getUserItineraries, { loading: loadingUserItineraries, error: errorUserItineraries, data: userItineraries, refetch: userItinerariesRefetch }] = useLazyQuery(FIND_ITINERARIES_FOR_USER);

    const { isOpen, onOpen, onClose } = useDisclosure()

    const { register, handleSubmit, errors } = useForm();

    const onCreateItinerary = (input: any) => {
        setLoadForCreateItinerary(true);
        createItinerary({ variables: {
            title: input["title"],
            summary: "",
            content: {
                content: []
            },
            pkuser: cookie["user"]["pkuser"]
        }}).then(data => {
            setLoadForCreateItinerary(false);
            userItinerariesRefetch && userItinerariesRefetch();
            setShowCreateItinerary(false);
        })
        
    }

    return (
        <Container maxW="20em" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <div onClick={() => onNavigate(Paths.SingleExperience)}>
                { imageUrl && <Image objectFit="cover" height="200px" width="100%" src={imageUrl} alt={imageAlt} loading="lazy" /> }
                { !imageUrl && <Image objectFit="cover" height="200px" width="100%" src="https://cdn-5fcbf5c4c1ac1a221c18568d.closte.com/wp-content/themes/ryse/assets/images/no-image/No-Image-Found-400x264.png" alt="photo not found"/> }

                <Box p="6">
                    <Box d="flex" alignItems="baseline">
                        <Box
                            color="gray.500"
                            fontWeight="semibold"
                            letterSpacing="wide"
                            fontSize="xs"
                            textTransform="uppercase"
                            ml="2"
                        >
                            {miles && miles.toFixed(2)} miles &bull; {elevation} feet
                        </Box>
                    </Box>
                
                    <Box
                        mt="1"
                        fontWeight="semibold"
                        as="h4"
                        lineHeight="tight"
                        isTruncated
                    >
                        {title}
                    </Box>

                </Box>
            </div>

            <Box p="4">
                <Box d="flex" mt="2" alignItems="center">
                    <Stars rating={rating} />
                    <Spacer />
                    <Button colorScheme="teal" size="xs" onClick={() => {
                        onOpen()
                        getUserItineraries({
                            variables: {
                                pkuser: cookie["user"]["pkuser"]
                            }
                        })
                    }}>
                        Save
                    </Button>

                    <Modal isOpen={isOpen} onClose={() => {
                        onClose()
                        setShowCreateItinerary(false)
                    }}>
                        <ModalOverlay />
                        <ModalContent styles={{ maxHeight: 500 }}>
                            <ModalHeader>Save this experience to your itinerary</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                { isOpen && loadingUserItineraries && <p>Loading...</p>}
                                { isOpen && errorUserItineraries && <p>Error!</p>}
                                { isOpen && userItineraries && (
                                    <Table>
                                        <Tbody>
                                            {userItineraries["findUser"]["itineraries"].map((item: any) => {
                                                return (
                                                    <Tr key={item.pkitinerary} onClick={() => {
                                                        addExperienceToItinerary({
                                                            variables: {
                                                                pkexperience: fk_experience_location,
                                                                pkitinerary: item.pkitinerary
                                                            }
                                                        })
                                                        onClose() 
                                                    }}> 
                                                        <Td>
                                                            {item.title}
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                            <Tr >
                                                { !showCreateItinerary && <Td onClick={() => setShowCreateItinerary(true)}><AddIcon/>&nbsp;Create a new Itinerary</Td> }
                                                { showCreateItinerary && <Td>
                                                    <form onSubmit = { handleSubmit(onCreateItinerary) }>
                                                        <Input size="sm" style={{width: "75%"}} name="title" placeholder="Title of your itinerary" ref={register} />
                                                        &nbsp;
                                                        { !loadForCreateItinerary && <Button size="sm" type="submit"><CheckIcon/></Button>}
                                                        { loadForCreateItinerary && <Button isLoading size="sm" type="submit"><CheckIcon/></Button>}
                                                        <Button size="sm" onClick={() => setShowCreateItinerary(false)}><CloseIcon/></Button>
                                                    </form>
                                                </Td> }
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                )}

                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={() => {
                                    onClose()
                                    setShowCreateItinerary(false)
                                }}>
                                Close
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                </Box>
            </Box>
            
        </Container>
    );
}