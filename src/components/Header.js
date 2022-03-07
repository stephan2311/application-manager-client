import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Switch,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../context/auth.context";

function Header() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode()


  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          <NavLink to="/">Home</NavLink>
          <HStack spacing={8} alignItems={'center'}>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {isLoggedIn &&
                <>
                  <NavLink to="/account">Account</NavLink>
                  <NavLink to="/account/applications">My Applications</NavLink>
                  <NavLink to="/account/applications/create-application">New Application</NavLink>
                  <NavLink to="/companies">Companies</NavLink>
                  <NavLink to="/companies/create-company">New Company</NavLink>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? '🌙' : '🔆'}
                  </Button>
                  <button onClick={logOutUser}>Logout</button>
                </>
              }
              {!isLoggedIn &&
                <>
                  <Button onClick={toggleColorMode}>
                    {colorMode === 'light' ? '🌙' : '🔆'}
                  </Button>
                  <NavLink to="/signup">Register</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </>
              }
            </HStack>
          </HStack>
        </Flex>
      </Box >
    </>
  )
}

export default Header;