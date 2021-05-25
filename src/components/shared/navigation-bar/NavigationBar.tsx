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
  Link,
  HStack,
} from '@chakra-ui/react';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { Link as ReactRouterLink, useHistory } from 'react-router-dom';
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
import styled from 'styled-components';
import { spacer8 } from '../../../utils/styles/constants';
import { BrandLink, Logo } from './Logo';

const Nav = styled.nav`
  align-items: center;
  display: flex;
  box-shadow: rgb(0 0 0 / 8%) 0px 1px 12px;
  padding: ${spacer8};
  position: sticky;
  top: 0;
  z-index: 1;
`;

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
    <Nav>
      <Grid templateColumns="repeat(5, 1fr)" gap="20" width="100%">
        <GridItem alignItems="center" display="flex" p="4">
          <Logo path={Paths.Home} />
        </GridItem>
        <Spacer />
        <HStack alignItems="center">
          <Link to={Paths.Experience} as={ReactRouterLink}>
            Experiences
          </Link>
          <Link to={Paths.Blog} as={ReactRouterLink}>
            Blogs
          </Link>
          <Link to={Paths.Itinerary} as={ReactRouterLink}>
            Itineraries
          </Link>
        </HStack>
        <Spacer />
        <GridItem p="4" alignItems="center" display="flex">
          <HStack padding="8px">
            {user ? (
              <Grid templateColumns="1fr 24px">
                <GridItem marginRight="8px">
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
                <BrandLink to={Paths.Profile} as={ReactRouterLink}>
                  <Icon as={MdPerson} w={8} h={8} />
                </BrandLink>
              </Grid>
            ) : (
              <HStack padding="8px">
                <Link onClick={onOpen}>
                  {/* <Login isOpen={isOpen} onOpen={onOpen} onClose={onClose} /> */}
                  <Text>Login</Text>
                </Link>
                <Link>Sign up</Link>
              </HStack>
            )}
          </HStack>
        </GridItem>
        {!user && <Login onClose={onClose} isOpen={isOpen} setUser={setUser} />}
      </Grid>
    </Nav>
  );
};
