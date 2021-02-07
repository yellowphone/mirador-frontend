import { Box, 
    Button, 
    Container, 
    Image, 
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
import { AddIcon } from '@chakra-ui/icons'
import React, { FC, useCallback, useState } from "react"
import { Stars } from "../media/Stars/Stars";
import { CardDataProps } from "./Card.types";

import { Paths } from '../../../utils/paths';
import { useHistory } from 'react-router-dom';
import { useMutation, useLazyQuery } from "@apollo/client";
import { ADD_EXPERIENCE_TO_ITINERARY } from "../../../graphql/mutations/itineraryMutation";
import { FIND_ITINERARIES_FOR_USER } from "../../../graphql/queries/itineraryQuery";

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
    } = experience

    const history = useHistory();
    const onNavigate = useCallback((path: Paths) => {
        history.push(path, { pkexperience: fk_experience_location });
    }, []);

    const [ addExperienceToItinerary, { data }] = useMutation(ADD_EXPERIENCE_TO_ITINERARY);

    const [ getUserItineraries, { loading: loadingUserItineraries, error: errorUserItineraries, data: userItineraries }] = useLazyQuery(FIND_ITINERARIES_FOR_USER);

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <Container maxW="20em" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <div onClick={() => onNavigate(Paths.SingleExperience)}>
                <Image src={imageUrl} alt={imageAlt} />

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
                                pkuser: 1
                            }
                        })
                    }}>
                        Save
                    </Button>

                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
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
                                                            <AddIcon/>&nbsp;{item.title}
                                                        </Td>
                                                    </Tr>
                                                )
                                            })}
                                        </Tbody>
                                    </Table>
                                )}

                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="blue" mr={3} onClick={onClose}>
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