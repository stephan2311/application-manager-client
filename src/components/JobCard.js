import { Box, Button, Center, Divider, Flex, Heading, List, ListIcon, ListItem, LinkOverlay, LinkBox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer, Stack, Text, useColorModeValue, useDisclosure, flexbox, Link, Image } from "@chakra-ui/react";
import moment from 'moment';
import axios from "axios";
import { ArrowRightIcon, CalendarIcon, ChatIcon, DragHandleIcon, EmailIcon, ExternalLinkIcon, LinkIcon } from '@chakra-ui/icons';

function JobCard({ url, title, company_name, company_logo, category, job_type, publication_date, candidate_required_location, salary, description, _id }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <Box as='article' maxW='md' p='5' borderWidth='1px' rounded='md'>
                <Flex>
                    <Box as='time'>
                        {moment(publication_date).fromNow()}
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
                        {job_type}
                    </Box>
                </Flex>
                <Heading size='md' my='2'>
                    {title}
                </Heading>
                <Flex>
                    <Box as='a' color='teal.400' fontWeight='bold'>
                        {company_name}
                    </Box>
                    <Spacer />
                    <Button size={'sm'} onClick={onOpen}>Show Details</Button>
                    <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Job Details</ModalHeader>
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
                                            <Image
                                                boxSize='100px'
                                                src={company_logo} />
                                            {/* fontSize={'sm'}
                                                fontWeight={500}
                                                bg={useColorModeValue('green.50', 'green.900')}
                                                p={2}
                                                px={3}
                                                color={'green.500'}
                                                rounded={'full'} */}
                                            <Stack direction={'row'} align={'center'} justify={'center'}>
                                                <Text fontSize={'3xl'} fontWeight={800}>
                                                    {title}
                                                </Text>
                                            </Stack>
                                        </Stack>

                                        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                                            <List spacing={3}>
                                                <ListItem>
                                                    <ListIcon as={CalendarIcon} color="green.400" mr={2} />
                                                    {moment(publication_date).format("LL")}
                                                </ListItem>
                                                <ListItem>
                                                    <ListIcon as={LinkIcon} color="green.400" mr={2} />
                                                    <Link href={url} isExternal>See Job Post<ExternalLinkIcon mx='2px' /></Link>
                                                </ListItem>
                                                <ListItem>
                                                    <Text as={DragHandleIcon} color="green.400" mr={2} />
                                                    {category}
                                                </ListItem>
                                                <ListItem>
                                                    <Text as={ArrowRightIcon} color="green.400" mr={2} />
                                                    {candidate_required_location}
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Center>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Flex>

            </Box>
        </>
    );
}

export default JobCard;
