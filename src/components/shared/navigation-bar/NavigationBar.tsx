import { GridItem, Spacer, Grid } from '@chakra-ui/react';
import React, { useCallback } from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import './NavigationBar.css'

export const NavigationBar = () => {
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
                            <Nav.Link>Login</Nav.Link>
                            <Nav.Link>Sign up</Nav.Link>
                    </Nav>
                </GridItem>
            </Grid>
        </Navbar>
    )
}