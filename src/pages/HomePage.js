import {
    Button,
    Flex,
    Heading,
    Image,
    Link,
    Stack,
    Text,
    useBreakpointValue,
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

export default function HomePage() {
    return (
        <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={6} w={'full'} maxW={'lg'}>
                    <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                        <Text
                            as={'span'}
                            position={'relative'}
                            _after={{
                                content: "''",
                                width: 'full',
                                height: useBreakpointValue({ base: '20%', md: '30%' }),
                                position: 'absolute',
                                bottom: 1,
                                left: 0,
                                bg: 'green.500',
                                zIndex: -1,
                            }}>
                            AppliBuddy
                        </Text>
                        <br />{' '}
                        <Text color={'green.500'} as={'span'}>
                            Your Application Manager
                        </Text>{' '}
                    </Heading>
                    <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                        AppliBuddy helps you to keep track of all your job applications and supports you in finding new job opportunities.
                    </Text>
                    <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                        <Link href={`/signup`}>
                            <Button
                                bg={'green.500'}
                                color={'white'}
                                _hover={{
                                    bg: 'green.500',
                                }}>
                                Register
                            </Button>
                        </Link>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://unsplash.com/photos/npxXWgQ33ZQ/download?ixid=MnwxMjA3fDB8MXxzZWFyY2h8N3x8am9iJTIwYXBwbGljYXRpb258ZW58MHx8fHwxNjQ2OTczMzMz&force=true'}
                />
            </Flex>
        </Stack>
    );
}