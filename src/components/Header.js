import {
  Box,
  Collapse,
  Flex,
  Avatar,
  HStack,
  VStack,
  Link,
  Icon,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Stack,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, ChevronDownIcon, ChevronRightIcon, AddIcon, SunIcon, MoonIcon } from '@chakra-ui/icons';
import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";

// function Header() {

//   const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const { colorMode, toggleColorMode } = useColorMode()


//   return (
//     <>
//       <Box
//         bg={useColorModeValue('gray.100', 'gray.900')}
//         px={4}
//         sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}
//         zIndex={200}>
//         <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
//           <IconButton
//             size={'md'}
//             icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
//             aria-label={'Open Menu'}
//             display={{ md: 'none' }}
//             onClick={isOpen ? onClose : onOpen}
//           />
//           {isLoggedIn &&
//             <NavLink to="/account/applications">
//               <Image src="https://img.icons8.com/material-rounded/24/000000/home.png" />
//             </NavLink>
//           }
//           {!isLoggedIn &&
//             <NavLink to="/">
//               <Text fontSize='2xl'>Welcome</Text>
//             </NavLink>
//           }
//           <HStack spacing={8} alignItems={'center'}>
//             <HStack
//               as={'nav'}
//               spacing={4}
//               display={{ base: 'none', md: 'flex' }}>
//               {isLoggedIn &&
//                 <>
//                   <NavLink to="/jobs">Jobs</NavLink>
//                   <NavLink to="/account/applications">My Applications</NavLink>
//                   <NavLink to="/account/applications/create-application">New Application</NavLink>
//                   <NavLink to="/companies">Companies</NavLink>
//                   <NavLink to="/companies/create-company">New Company</NavLink>
//                   <Button onClick={toggleColorMode}>
//                     {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//                   </Button>
//                   <Button bgColor={'red.500'} color={'white'} onClick={logOutUser}>Logout</Button>
//                 </>
//               }
//               {!isLoggedIn &&
//                 <>
//                   <Button onClick={toggleColorMode}>
//                     {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
//                   </Button>
//                   <NavLink to="/signup">Register</NavLink>
//                   <NavLink to="/login">Login</NavLink>
//                 </>
//               }
//             </HStack>
//           </HStack>
//         </Flex>
//       </Box >
//     </>
//   )
// }

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');


  return (
    <>
      <Box
        bg={useColorModeValue('gray.100', 'gray.900')}
        px={4}
        width={'100vw'}
        sx={{ position: '-webkit-sticky', /* Safari */ position: 'sticky', top: '0', }}
        zIndex={200}>
        <Flex
          w="100%"
          px="6"
          py="5"
          align="center"
          justify="space-between">
          <IconButton
            size={'md'}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={'Open Menu'}
            display={{ md: 'none' }}
            onClick={isOpen ? onClose : onOpen}
          />
          {isLoggedIn &&
            <NavLink to="/account/applications">
              <Image src="https://img.icons8.com/color-glass/24/000000/home.png" />
            </NavLink>
          }
          {!isLoggedIn &&
            <NavLink to="/">
              <Text fontSize='2xl'>Welcome</Text>
            </NavLink>
          }
          <HStack spacing={5} as={'nav'}>
            {isLoggedIn &&
              <HStack spacing='16px' display={{ base: "none", md: "flex" }}>
                <NavLink _hover={{
                  fontSize: '2xl',
                }} to="/jobs">Jobs</NavLink>
                <NavLink to="/account/applications">My Applications</NavLink>
                <NavLink to="/account/applications/create-application">New Application</NavLink>
                <NavLink to="/companies">Companies</NavLink>
                <NavLink to="/companies/create-company">New Company</NavLink>
                <Button bgColor={'red.500'} color={'white'} onClick={logOutUser}>Logout</Button>
              </HStack>
            }
            {!isLoggedIn &&
              <HStack display={{ base: "none", md: "flex" }}>
                <NavLink to="/signup">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
                <Button
                  variant={'solid'}
                  colorScheme={'green'}
                  size={'sm'}
                  mr={4}>
                  Signup
                </Button>
              </HStack>
            }
            <Button onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
          </HStack>
        </Flex>

        {isOpen ? (
          <Box p={4} display={{ md: 'none' }}>
            <Flex as={'nav'} spacing={4}>
              {isLoggedIn &&
                <Stack spacing='16px' alignItems={'left'}>
                  <NavLink to="/jobs">Jobs</NavLink>
                  <NavLink to="/account/applications">My Applications</NavLink>
                  <NavLink to="/account/applications/create-application">New Application</NavLink>
                  <NavLink to="/companies">Companies</NavLink>
                  <NavLink to="/companies/create-company">New Company</NavLink>
                  <Button bgColor={'red.500'} color={'white'} onClick={logOutUser}>Logout</Button>
                </Stack>
              }
              {!isLoggedIn &&
                <VStack alignItems={'left'}>
                  <NavLink to="/signup">Register</NavLink>
                  <NavLink to="/login">Login</NavLink>
                </VStack>
              }
            </Flex>
          </Box>
        ) : null}
      </Box>
    </>
  );
}