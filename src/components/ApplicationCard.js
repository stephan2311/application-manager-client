import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Center, Flex, Heading, List, ListIcon, ListItem, LinkOverlay, LinkBox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer, Stack, Text, useColorModeValue, useDisclosure, flexbox } from "@chakra-ui/react";
import moment from 'moment';
import axios from "axios";
import { CalendarIcon, ChatIcon, EmailIcon, LinkIcon } from '@chakra-ui/icons';
import ApplicationDetails from "./ApplicationDetails";

function ApplicationCard({ position, dateApplied, company, status, website, channel, contact, comment, _id }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box as='article' maxW='md' p='5' borderWidth='1px' rounded='md'>
                <Flex>
                    <Box as='time'>
                        {moment(dateApplied).fromNow()}
                    </Box>
                    <Spacer />
                    <Box
                        fontSize={'sm'}
                        fontWeight={500}
                        bg={useColorModeValue('green.50', 'green.900')}
                        p={2}
                        px={3}
                        color={'green.500'}
                        rounded={'full'}>
                        {status}
                    </Box>
                </Flex>
                <Heading size='md' my='2'>
                    {position}
                </Heading>
                <Flex>
                    <Box as='a' color='teal.400' fontWeight='bold'>
                        {company.name}
                    </Box>
                    <Spacer />
                    <Button size={'sm'} onClick={onOpen}>Show Details</Button>
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Application Details</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Center py={3}>
                                    <Box
                                        w={'full'}
                                        bg={useColorModeValue('white', 'gray.800')}
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
                                                {status}
                                            </Text>
                                            <Stack direction={'row'} align={'center'} justify={'center'}>
                                                <Text fontSize={'3xl'} fontWeight={800}>
                                                    {position}
                                                </Text>
                                            </Stack>
                                        </Stack>

                                        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                                            <List spacing={3}>
                                                <ListItem>
                                                    <ListIcon as={CalendarIcon} color="green.400" />
                                                    {moment(dateApplied).format("LL")}
                                                </ListItem>
                                                <ListItem>
                                                    <ListIcon as={EmailIcon} color="green.400" />
                                                    {contact.mail}
                                                </ListItem>
                                                <ListItem>
                                                    <ListIcon as={LinkIcon} color="green.400" />
                                                    {company.website}
                                                </ListItem>
                                                <ListItem>
                                                    <ListIcon as={ChatIcon} color="green.400" />
                                                    {channel}
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Center>
                            </ModalBody>
                            <ModalFooter>
                                <LinkBox as={'button'}>
                                    <LinkOverlay href={`/account/applications/edit/${_id}`}>
                                        <Button
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
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>

            </Box>
        </>
    );
}

export default ApplicationCard;
