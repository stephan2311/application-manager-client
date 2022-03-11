import { useState, useEffect } from "react";
import { useParams, Link, Outlet, NavLink } from 'react-router-dom';
import axios from "axios";
import moment from 'moment';
import {
    Box,
    Center,
    Text,
    Stack,
    List,
    ListItem,
    ListIcon,
    Button,
    useColorModeValue,
    LinkBox,
    LinkOverlay,
} from '@chakra-ui/react';
import { CalendarIcon, EmailIcon, LinkIcon } from '@chakra-ui/icons';

export default function ApplicationDetails(props) {


    return (
        <>
            <Center py={6}>
                <Box
                    maxW={'330px'}
                    w={'full'}
                    bg={useColorModeValue('white', 'gray.800')}
                    boxShadow={'2xl'}
                    rounded={'md'}
                    overflow={'hidden'}>
                    <Stack
                        textAlign={'center'}
                        p={6}
                        color={useColorModeValue('gray.800', 'white')}
                        align={'center'}>
                        <Text
                            fontSize={'sm'}
                            fontWeight={500}
                            bg={useColorModeValue('green.50', 'green.900')}
                            p={2}
                            px={3}
                            color={'green.500'}
                            rounded={'full'}>
                            {props.comment}
                        </Text>
                        <Stack direction={'row'} align={'center'} justify={'center'}>
                            <Text fontSize={'3xl'} fontWeight={800}>
                                {props.position}
                            </Text>
                        </Stack>
                    </Stack>

                    <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                        <List spacing={3}>
                            <ListItem>
                                <ListIcon as={CalendarIcon} color="green.400" />
                                {props.dateApplied}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={EmailIcon} color="green.400" />
                                {props.contact?.mail}
                            </ListItem>
                            <ListItem>
                                <ListIcon as={LinkIcon} color="green.400" />
                                {props.website}
                            </ListItem>
                        </List>

                        <LinkBox as={'button'}>
                            <LinkOverlay href={`/account/applications/edit/${props._id}`}>
                                <Button
                                    mt={10}
                                    w={'full'}
                                    bg={'green.400'}
                                    color={'white'}
                                    rounded={'xl'}
                                    boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                    _focus={{
                                        bg: 'green.500',
                                    }}>
                                    Edit Application
                                </Button>
                            </LinkOverlay>
                        </LinkBox>

                    </Box>
                </Box>
            </Center>
        </>
    );
}