import {
  GridItem,
  Spacer,
  Grid,
  Icon,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Text,
  useDisclosure,
  Heading,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Nav } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import { useHistory } from 'react-router-dom';
import { Paths } from '../../../utils/paths';
import './NavigationBar.css';
import { MdPerson } from 'react-icons/md';
import { AddIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { Login } from '../../login/Login';
import {
  getUserContext,
  IUserContext,
  setUserContext,
  logout,
} from '../../../utils/userContext';
import { useCookies } from 'react-cookie';

export const NavigationBar: FC = () => {
  const [cookie, , removeCookie] = useCookies(['user']);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = useState<IUserContext | undefined>(getUserContext());
  const history = useHistory();

  const onNavigate = useCallback(
    (path: Paths) => {
      history.push(path);
    },
    [history]
  );

  const onLogout = useCallback(() => {
    logout();
    removeCookie('user', { path: '/' });
    setUser(undefined);
    setUserContext(undefined);
    history.push(Paths.Home);
  }, [history, setUser, removeCookie]);

  useEffect(() => {
    const currUser = getUserContext();
    if (!user && currUser && cookie['user']) {
      console.log('setting new user');
      setUser(currUser);
    } else if (user && !currUser && !cookie['user']) {
      setUser(undefined);
    }
  }, [cookie, user]);

  return (
    <Navbar bg="light justify-content-between" sticky="top">
      <Grid templateColumns="repeat(5, 1fr)" gap="20" width="100%">
        <GridItem p="4">
          <Navbar.Brand onClick={() => onNavigate(Paths.Home)}>
            <Heading as="h1" size="lg" fontFamily="Comfortaa">
              Mirador
            </Heading>
          </Navbar.Brand>
        </GridItem>
        <Spacer />
        <GridItem pt="4">
          <Nav className="center">
            <Nav.Link onClick={() => onNavigate(Paths.Experience)}>
              Experiences
            </Nav.Link>
            <Nav.Link onClick={() => onNavigate(Paths.Blog)}>Blogs</Nav.Link>
            <Nav.Link onClick={() => onNavigate(Paths.Itinerary)}>
              Itineraries
            </Nav.Link>
          </Nav>
        </GridItem>
        <Spacer />
        <GridItem p="4">
          <Nav className="center">
            {user ? (
              <Grid templateColumns="repeat(3, 1fr)">
                <GridItem>
                  <Menu>
                    <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
                      <AddIcon />
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        onClick={() => onNavigate(Paths.CreateExperience)}
                      >
                        New Experience
                      </MenuItem>
                      <MenuItem
                        onClick={() => onNavigate(Paths.CreateItinerary)}
                      >
                        New Itinerary
                      </MenuItem>
                      <MenuItem onClick={() => onNavigate(Paths.CreateBlog)}>
                        New Blog
                      </MenuItem>

                      {/* This is only temporary */}
                      <MenuItem onClick={onLogout}>Logout</MenuItem>
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
            )}
          </Nav>
        </GridItem>
        {!user && <Login onClose={onClose} isOpen={isOpen} setUser={setUser} />}
      </Grid>
    </Navbar>
  );
};
