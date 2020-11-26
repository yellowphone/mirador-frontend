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
        <Navbar bg="light justify-content-between" expand="lg" sticky='top'>
            <Navbar.Brand onClick={() => onNavigate(Paths.Home)}>Mirador</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
                <Nav className='mr-auto'>
                    <Nav.Link onClick={() => onNavigate(Paths.Adventure)}>Adventures</Nav.Link>
                    <Nav.Link onClick={() => onNavigate(Paths.Blog)}>Blogs</Nav.Link>
                    <Nav.Link onClick={() => onNavigate(Paths.Itenerary)}>Iteneraries</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}