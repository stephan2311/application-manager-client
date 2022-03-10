import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import { Box, Badge, Button, Center, Container, Grid, GridItem, Heading, HStack, Image, Link, ListIcon, Stack, Text, useColorModeValue, Spacer, VStack } from "@chakra-ui/react";
import { InfoIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import Map from "../components/Map";


function CompanyDetailsPage(props) {
    const [company, setCompany] = useState(null);
    const { companyId } = useParams();

    console.log(process.env.REACT_APP_API_URL);

    const getCompany = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/companies/${companyId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneCompany = response.data;
                setCompany(oneCompany);
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getCompany();
    }, []);


    return (
        <VStack textAlign="center" py={10} px={6}>
            <Box>
                <InfoIcon boxSize={'50px'} color={'green.500'} />
                <Heading as="h2" size="xl" mt={6} mb={2}>
                    Company Details
                </Heading>
            </Box>

            {company && (
                <>
                    <Container centerContent maxW='xl' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                        {company.address &&
                            <Map street={company.address.street} city={company.address.city} zip={company.address.zip} country={company.address.country} />
                        }
                        <Box p='6'>
                            <Box display='flex' alignItems='baseline'>
                                <Box
                                    color='gray.500'
                                    fontWeight='semibold'
                                    letterSpacing='wide'
                                    fontSize='xs'
                                    textTransform='uppercase'
                                    ml='2'
                                >
                                </Box>
                            </Box>
                            <Box
                                mt='1'
                                fontWeight='semibold'
                                as='h4'
                                lineHeight='tight'
                                isTruncated
                            >
                                {company.name}
                            </Box>

                            <Box>
                                <Link href={company.website} isExternal>
                                    Company Website <ExternalLinkIcon mx='2px' />
                                </Link>
                            </Box>

                            <Box display='flex' mt='2' alignItems='center' ml='2' color='gray.600' fontSize='sm'>
                                {company.address.city}, {company.address.country}
                            </Box>
                        </Box>
                    </Container>
                </>
            )}

            <Box>
                <Link href="/companies">
                    <Button m={2}>Back to List</Button>
                </Link>

                <Link href={`/companies/edit/${companyId}`}>
                    <Button m={2}>Edit Company</Button>
                </Link>
            </Box>

        </VStack>
    );
}

export default CompanyDetailsPage;