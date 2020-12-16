import { GridItem, Spacer, Grid, Icon, Tooltip, Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import './NavigationBar.css'
import { MdPerson } from 'react-icons/md'
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';

export const NavigationBar = () => {
    const loggedIn = true;
    const history = useHistory();

    const onNavigate = useCallback((path: Paths) => {
        history.push(path);
    }, []);

    return (
        <Navbar bg="light justify-content-between" sticky='top'>
            <Grid templateColumns='repeat(5, 1fr)' gap='20'>
                <GridItem p='4'>
                    <Navbar.Brand onClick={() => onNavigate(Paths.Home)}>Mirador</Navbar.Brand>
                </GridItem>
                <Spacer />
                <GridItem pt='4'>
                    <Nav className='center'>
                        <Nav.Link onClick={() => onNavigate(Paths.Adventure)}>Adventures</Nav.Link>
                        <Nav.Link onClick={() => onNavigate(Paths.Blog)}>Blogs</Nav.Link>
                        <Nav.Link onClick={() => onNavigate(Paths.Itenerary)}>Iteneraries</Nav.Link>
                    </Nav>
                </GridItem>
                <Spacer />
                <GridItem p='4'>
                    <Nav className='center'>
                    {
                        loggedIn 
                        ? (
                            <Grid templateColumns='repeat(3, 1fr)'>
                                <GridItem>
                                    <Menu>
                                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                                            <AddIcon />
                                        </MenuButton>
                                        <MenuList>
                                            <MenuItem>New Adventure</MenuItem>
                                            <MenuItem>New Itinerary</MenuItem>
                                            <MenuItem>New Blog</MenuItem>
                                        </MenuList>
                                    </Menu>
                                </GridItem>
                                <Spacer />
                                <GridItem onClick={() => onNavigate(Paths.Profile)}>
                                    <Icon as={MdPerson} w={8} h={8} />
                                </GridItem>
                            </Grid>
                        ) : (
                            <>
                                <Nav.Link>Login</Nav.Link>
                                <Nav.Link>Sign up</Nav.Link>
                            </>
                        )
                    }
                    </Nav>
                </GridItem>
            </Grid>
        </Navbar>
    )
}