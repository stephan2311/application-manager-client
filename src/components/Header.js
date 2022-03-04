import { Box, Container, Flex } from '@chakra-ui/react';
import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from "../context/auth.context";


function Header() {

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Box>
      <Flex>
        <NavLink to="/">Home</NavLink>

        {isLoggedIn &&
          <>
            <NavLink to="/applications">Applications</NavLink>
            <NavLink to="/applications/create-application">New Application</NavLink>
            <button onClick={logOutUser}>Logout</button>
          </>
        }

        {!isLoggedIn &&
          <>
            <NavLink to="/signup">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </>
        }

      </Flex>
    </Box >
  )
}

export default Header;