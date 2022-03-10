import ApplicationList from "../components/ApplicationList";
import ApplicationDetails from "../components/ApplicationDetails";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Center, Container, GridItem, Heading, Input, SimpleGrid, Spacer } from "@chakra-ui/react";


function ApplicationsPage() {


    return (
        <div>
            <Heading align={'center'} m={20}>Applications</Heading>
            <Container>
            </Container>
            <Spacer />
            <Container>
                <ApplicationList />
            </Container>

        </div>
    )
}

export default ApplicationsPage;