import React from 'react';
import { Container, SimpleGrid, Center, Heading, VStack, Text, Image, Box } from "@chakra-ui/react"
import { NavigationBar } from '../../shared/navigation-bar/NavigationBar';
import { BlogExperienceCard } from '../blog-experience-card/BlogExperienceCard'

export const SingleBlog = () => {
    return(
        <>
        <Container maxW="lg">
            <VStack spacing="50px">
                <SimpleGrid columns={1}>
                    <Center>
                        <Heading>A cool blog post!</Heading>
                    </Center>
                </SimpleGrid>

                <SimpleGrid columns={1}>
                    <Center>
                        <Text>
                            Turmoil has engulfed the
                            Galactic Republic. The taxation
                            of trade routes to outlying star
                            systems is in dispute.
                            Hoping to resolve the matter
                            with a blockade of deadly
                            battleships, the greedy Trade
                            Federation has stopped all
                            shipping to the small planet
                            of Naboo.
                        </Text>
                    </Center>
                </SimpleGrid>

                <SimpleGrid columns={2} spacing={3}>
                    <BlogExperienceCard pkexperience={1} />
                    <Text>
                        War! The Republic is crumbling
                        under attacks by the ruthless
                        Sith Lord, Count Dooku.
                        There are heroes on both sides.
                        Evil is everywhere. 
                        <br></br>
                        <br></br>
                        In a stunning move, the
                        fiendish droid leader, General
                        Grievous, has swept into the
                        Republic capital and kidnapped
                        Chancellor Palpatine, leader of
                        the Galactic Senate.  
                        <br></br>  
                        <br></br>           
                        Luke Skywalker has returned to
                        his home planet of Tatooine in
                        an attempt to rescue his
                        friend Han Solo from the
                        clutches of the vile gangster
                        Jabba the Hutt.      
                    </Text>
                </SimpleGrid>

                <SimpleGrid columns={1}>
                    <Center>
                        <Image src="https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-16.jpg" />
                    </Center>
                </SimpleGrid>

                <SimpleGrid columns={2} spacing={3}>
                    <Text>
                        It is a dark time for the
                        Rebellion. Although the Death
                        Star has been destroyed,
                        Imperial troops have driven the
                        Rebel forces from their hidden
                        base and pursued them across
                        the galaxy.
                        <br></br>
                        <br></br>
                        Evading the dreaded Imperial
                        Starfleet, a group of freedom
                        fighters led by Luke Skywalker
                        has established a new secret
                        base on the remote ice world
                        of Hoth.
                        <br></br>
                        <br></br>
                        Little does Luke know that the
                        GALACTIC EMPIRE has secretly
                        begun construction on a new
                        armored space station even
                        more powerful than the first
                        dreaded Death Star.
                    </Text>
                    <Image src="https://starwarsblog.starwars.com/wp-content/uploads/2020/04/star-wars-backgrounds-36-1.jpg"  />
                </SimpleGrid>

                <SimpleGrid columns={1}>
                    <Text>
                        It is a dark time for the
                        Rebellion. Although the Death
                        Star has been destroyed,
                        Imperial troops have driven the
                        Rebel forces from their hidden
                        base and pursued them across
                        the galaxy.
                        Evading the dreaded Imperial
                        Starfleet, a group of freedom
                        fighters led by Luke Skywalker
                        has established a new secret
                        base on the remote ice world
                        of Hoth.
                        The evil lord Darth Vader,
                        obsessed with finding young
                        Skywalker, has dispatched
                        thousands of remote probes into
                        the far reaches of space
                    </Text>
                </SimpleGrid>

            </VStack>
        </Container>
            
        </>
    )
}
