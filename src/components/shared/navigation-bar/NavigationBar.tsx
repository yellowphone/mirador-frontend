import { Box, Flex, Spacer } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';

export const NavigationBar = () => {
    const history = useHistory();

    const onNavigate = useCallback((path: Paths) => {
        history.push(path);
    }, []);

    return (
        <Navbar bg="light justify-content-between" sticky='top'>
            <Flex>
                <Box p="4" >
                    <Navbar.Brand onClick={() => onNavigate(Paths.Home)}>Mirador</Navbar.Brand>
                </Box>
                <Spacer />
                <Box p="4" >
                    <Nav className='mr-auto'>
                        <Nav.Link onClick={() => onNavigate(Paths.Adventure)}>Adventures</Nav.Link>
                        <Nav.Link onClick={() => onNavigate(Paths.Blog)}>Blogs</Nav.Link>
                        <Nav.Link onClick={() => onNavigate(Paths.Itenerary)}>Iteneraries</Nav.Link>
                    </Nav>
                </Box>
            </Flex>
        </Navbar>
    )
}