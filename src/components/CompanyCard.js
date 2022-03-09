import { Box, Button, Center, Flex, Heading, List, ListIcon, ListItem, LinkOverlay, LinkBox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer, Stack, Text, useColorModeValue, useDisclosure, flexbox } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon, EmailIcon, LinkIcon } from '@chakra-ui/icons';


function CompanyCard({ name, website, address, _id }) {

    const { isOpen, onOpen, onClose } = useDisclosure();


    return (
        <div>
            <Box as='article' maxW='md' p='5' borderWidth='1px' rounded='md'>
                <Heading size='md' my='2'>
                    {name}
                </Heading>
                <Flex>
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
                                            <Stack direction={'row'} align={'center'} justify={'center'}>
                                                <Text fontSize={'3xl'} fontWeight={800}>
                                                    {name}
                                                </Text>
                                            </Stack>
                                        </Stack>

                                        <Box bg={useColorModeValue('gray.50', 'gray.900')} px={6} py={10}>
                                            <List spacing={3}>
                                                <ListItem>
                                                    <ListIcon as={LinkIcon} color="green.400" />
                                                    {website}
                                                </ListItem>
                                                <ListItem>
                                                📍 {address.city}
                                                </ListItem>
                                            </List>
                                        </Box>
                                    </Box>
                                </Center>
                            </ModalBody>
                            <ModalFooter>
                                <LinkBox as={'button'}>
                                    <LinkOverlay href={`/companies/edit/${_id}`}>
                                        <Button
                                            w={'full'}
                                            bg={'green.400'}
                                            color={'white'}
                                            rounded={'xl'}
                                            boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                            _focus={{
                                                bg: 'green.500',
                                            }}>
                                            Edit Company
                                        </Button>
                                    </LinkOverlay>
                                </LinkBox>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>

            </Box>
        </div>
    );
}

export default CompanyCard;
