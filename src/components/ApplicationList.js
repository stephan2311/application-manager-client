import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import ApplicationCard from "./ApplicationCard";
import { Box, Button, Center, GridItem, Heading, Model, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";

function ApplicationList() {
    const [applications, setApplications] = useState([]);

    const getAllApplications = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/account/applications`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => setApplications(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllApplications();
    }, []);

    return (
        <Box>
            {!applications &&
                <Box textAlign="center" py={10} px={6}>
                    <WarningTwoIcon boxSize={'50px'} color={'orange.300'} />
                    <Heading as="h2" size="xl" mt={6} mb={2}>
                        No Applications
                    </Heading>
                    <Text color={'gray.500'}>
                        You don't have any applications at the moment, would you like to add one?
                    </Text>
                    <NavLink to="/account/applications/create-application"><Button bgColor={'green.500'} color={'white'} m={4}>New Application</Button></NavLink>
                </Box>
            }
            {applications &&
                <>
                    {applications.map((application) => {
                        return (
                            <Box m={2}>
                                <ApplicationCard key={application._id} {...application} />
                            </Box>
                        )
                    }
                    )}
                </>
            }

        </Box>
    );
}

export default ApplicationList;
