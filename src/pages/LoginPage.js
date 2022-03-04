import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from 'react-router-dom';
import axios from 'axios';

import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

export default function LoginPage(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);


    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { username, password };

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, requestBody)
            .then((response) => {
                console.log('JWT token', response.data.authToken);
                storeToken(response.data.authToken);
                authenticateUser();
                navigate('/projects');
            })
            .catch((error) => {
                const msg = error.response.data.errorMessage;
                console.log("error logging in...", msg);
                setErrorMessage(msg);
            })
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Login to your account</Heading>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <form action="submit" onSubmit={handleLoginSubmit}>
                            <FormControl id="username">
                                <FormLabel>Username</FormLabel>
                                <Input type="username" onChange={handleUsername} />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel>Password</FormLabel>
                                <Input type="password" onChange={handlePassword} />
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    {/* <Checkbox>Remember me</Checkbox> */}
                                    {/* <Link color={'blue.400'}>Forgot password?</Link> */}
                                    
                                    <Text>Don't have an account yet?</Text>
                                    <Link as={ReachLink} color={'blue.400'} to={"/signup"}> Sign Up</Link>
                                </Stack>
                                <Button
                                    type='submit'
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Stack>
                </Box>
            </Stack >
        </Flex >
    );
}

// function LoginPage(props) {


//     return (
//         <div>
//             <h1>Login</h1>

//             <form onSubmit={handleLoginSubmit}>

//                 <FormControl isRequired>
//                     <FormLabel htmlFor='username'>Username</FormLabel>
//                     <Input id='username' placeholder='Username' value={username} onChange={handleUsername} />
//                 </FormControl>

//                 <FormControl isRequired>
//                     <FormLabel htmlFor='password'>Password</FormLabel>
//                     <Input id='password' placeholder='Password' value={password} onChange={handlePassword} />
//                 </FormControl>

//                 <Button type="submit">Login</Button>
//             </form>
//             {errorMessage && <p>{errorMessage}</p>}

//             <p>Don't have an account yet?</p>
//             <Link as={ReachLink} to={"/signup"}> Sign Up</Link>
//         </div>
//     )
// }