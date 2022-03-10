import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Box, Center, Heading, List, ListIcon, ListItem, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";
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
        <div>

            {company && (
                <>
                    <Heading>Company Details</Heading>
                    <LinkIcon>{company.website}</LinkIcon>
                    <Center py={3}>
                        <Box
                            w={'full'}
                            overflow={'hidden'}>
                            <Stack
                                textAlign={'center'}
                                p={6}
                                align={'center'}>
                                <Stack direction={'row'} align={'center'} justify={'center'}>
                                    <Text fontSize={'3xl'} fontWeight={800}>
                                        {company.name}
                                    </Text>
                                </Stack>
                            </Stack>

                            <Box px={6} py={10}>
                                <List spacing={3}>
                                    <ListItem>
                                        <ListIcon as={LinkIcon} color="green.400" />
                                        {company.website}
                                    </ListItem>
                                    <ListItem>
                                        <Map street={company.address.street} city={company.address.city} zip={company.address.zip} country={company.address.country} />
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Center>

                </>
            )}

            {/* {application && application.tasks.map((task) => <ApplicationCard key={application._id} {...application} />)} */}

            <Link to="/companies">
                <button>Back to List</button>
            </Link>

            <Link to={`/companies/edit/${companyId}`}>
                <button>Edit Company</button>
            </Link>

        </div>
    );
}

export default CompanyDetailsPage;