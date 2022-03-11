import { Box, Button, Center, Flex, Heading, List, ListIcon, ListItem, LinkOverlay, LinkBox, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Spacer, Stack, Text, useColorModeValue, useDisclosure, flexbox, HStack } from "@chakra-ui/react";
import { CalendarIcon, ChatIcon, EmailIcon, LinkIcon } from '@chakra-ui/icons';
import Map from "./Map";

function CompanyCard({ name, website, address, _id }) {


    return (
        <div>
            <HStack as='article' maxW='md' p='5' borderWidth='1px' rounded='md'>
                <Heading size='md' my='2'>
                    {name}
                </Heading>
                <Spacer/>
                    <LinkBox as={'button'}>
                        <LinkOverlay href={`/companies/${_id}`}>
                            <Button
                                w={'full'}
                                bg={'green.400'}
                                color={'white'}
                                rounded={'xl'}
                                boxShadow={'0 5px 20px 0px rgb(72 187 120 / 43%)'}
                                _focus={{
                                    bg: 'green.500',
                                }}>
                                Show Details
                            </Button>
                        </LinkOverlay>
                    </LinkBox>
            </HStack>
        </div>
    );
}

export default CompanyCard;
