import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Center, Container, Heading, Link, Spinner, Text } from "@chakra-ui/react";
import JobCard from "../components/JobCard";


function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [fetching, setFetching] = useState(true);


    const getAllJobs = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/jobs`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            ).then((response) => {
                setJobs(response.data);
                setFetching(false);
            })
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllJobs();
    }, []);


    return (
        <div>
            <Container mt={2}>
                <Center>
                    <Box>
                        <Heading align={'center'} mt={20}>Jobs</Heading>
                        <Text>
                            Job Search powered by{' '}
                            <Link color='teal.500' href='https://remotive.io/'>
                                Remotive.io
                            </Link>
                        </Text>
                    </Box>
                </Center>
                {fetching && <Spinner></Spinner>}
                {jobs.map((job) => {
                    return (
                        <Box m={2}>
                            <JobCard key={job._id} {...job} />
                        </Box>
                    )
                }
                )}
            </Container>
        </div >

    );
}

export default JobListPage;