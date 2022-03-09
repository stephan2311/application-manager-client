import ApplicationList from "../components/ApplicationList";
import ApplicationDetails from "../components/ApplicationDetails";
import { Outlet } from "react-router-dom";
import { Box, Center, Container, GridItem, Heading, SimpleGrid } from "@chakra-ui/react";

function ApplicationsView() {
    return (
        <div>
            <Heading m={4}>Applications</Heading>
            <Container>
                    <ApplicationList />
            </Container>

        </div>
    )
}

export default ApplicationsView;