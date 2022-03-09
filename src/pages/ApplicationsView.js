import ApplicationList from "../components/ApplicationList";
import ApplicationDetails from "../components/ApplicationDetails";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Center, Container, GridItem, Heading, Input, SimpleGrid, Spacer } from "@chakra-ui/react";
import axios from "axios";


function ApplicationsView() {

    const [fetching, setFetching] = useState(true);
    const [remotiveJobs, setRemotiveJobs] = useState([]);
//    const [searchQuery, setSearchQuery] = useState("");

//    useEffect(() => {
//        axios
//            .get(`https://remotive.io/api/remote-jobs?search=${searchQuery}`)
//            .then((response) => {
//                console.log('response.data', response.data);
//                setRemotiveJobs(response.data);
//                setFetching(false);
//           });
//    }, []);

    return (
        <div>
            <Heading align={'center'} m={20}>Applications</Heading>
            <Container>
            <Input placeholder='Search for Jobs at Remotive.io'>
            </Input>
            </Container>
            <Spacer />
            <Container>
                <ApplicationList />
            </Container>

        </div>
    )
}

export default ApplicationsView;