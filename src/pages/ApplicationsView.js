import ApplicationList from "../components/ApplicationList";
import ApplicationDetails from "../components/ApplicationDetails";
import { Outlet } from "react-router-dom";
import { GridItem, Heading, SimpleGrid } from "@chakra-ui/react";

function ApplicationsView() {
    return (
        <div>
            <Heading m={4}>Applications</Heading>
            <SimpleGrid
                h='80vh'
                // templateRows='repeat(2, 1fr)'
                templateColumns='repeat(5, 1fr)'
                gap={4}
            >
                <GridItem
                    style={{ overflow: 'scroll' }}
                    w={'50vw'}
                    colSpan={2}>
                    <ApplicationList />
                </GridItem>
                <GridItem>
                    <ApplicationDetails />
                </GridItem>
            </SimpleGrid>

        </div>
    )
}

export default ApplicationsView;