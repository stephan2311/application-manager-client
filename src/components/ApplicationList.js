import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationCard from "./ApplicationCard";
import { Box, GridItem } from "@chakra-ui/react";
import ApplicationDetails from "./ApplicationDetails";


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
            {applications.map((application) => {
                console.table(application)
                return (
                    <Box m={2}>
                        <ApplicationCard key={application._id} {...application} />
                    </Box>
                )
            }
            )}
        </Box>
    );
}

export default ApplicationList;
