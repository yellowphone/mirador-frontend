import { GridItem, Spacer, Grid, Icon, Menu, MenuButton, Button, MenuList, MenuItem, Text, useDisclosure } from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import './NavigationBar.css'
import { MdPerson } from 'react-icons/md'
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Login } from '../../login/Login';
import { getLoginContext, IGoogleProfile, initLoginContext, LoginContext } from '../../../utils/User';

export const NavigationBar: FC = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [user, setUser] = useState<LoginContext>(undefined);
    const history = useHistory();

    const onNavigate = useCallback((path: Paths) => {
        history.push(path);
    }, [history]);
    console.log(user)

    useEffect(() => {
        // if (!user) {
            console.log('setting')
            initLoginContext().then(user => setUser(user as IGoogleProfile))
        // }
        console.log(getLoginContext())
    }, [setUser]);

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
                        user 
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
                                <Nav.Link onClick={onOpen}>
                                    {/* <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
                                    <Text>Login</Text>
                                </Nav.Link>
                                <Nav.Link>Sign up</Nav.Link>
                            </>
                        )
                    }
                    </Nav>
                </GridItem>
                { !user && <Login onClose={onClose} isOpen={isOpen} /> }
            </Grid>
        </Navbar>
    )
}