import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Flex, Heading, HStack, LinkBox, LinkOverlay, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import moment from 'moment';
import axios from "axios";
import ApplicationDetails from "./ApplicationDetails";

function ApplicationCard({ position, dateApplied, company, status }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box as='article' maxW='sm' p='5' borderWidth='1px' rounded='md'>
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
                                <ApplicationDetails />
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='ghost'>Secondary Action</Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>

            </Box>
        </>
    );
}

export default ApplicationCard;
