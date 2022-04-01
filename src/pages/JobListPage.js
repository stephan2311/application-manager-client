import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Center, Container, FormControl, Heading, Input, Link, Spinner, Text } from "@chakra-ui/react";
import JobCard from "../components/JobCard";
import Fuse from 'fuse.js';

function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [query, updateQuery] = useState('');

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

    const options = {
        keys: [
            'title',
            'company_name',
            'category',
            'job_type',
        ]
    };

    const myIndex = Fuse.createIndex(options.keys, jobs)

    const fuse = new Fuse(jobs, options, myIndex)

    const results = fuse.search(query);

    console.log(results);

    function onSearch({ currentTarget }) {
        updateQuery(currentTarget.value);
    }

    console.log(query)
    
    return (
        <Container mt={4} >
            <Box textAlign={"center"}>
                <Heading align={'center'} m={4}>Job Posts</Heading>
                <Text>
                    Job Search powered by{' '}
                    <Link color='teal.500' href='https://remotive.io/'>
                        Remotive.io
                    </Link>
                    <Input type="text" value={query} onChange={onSearch} />
                </Text>
            </Box>
            {fetching && <Spinner></Spinner>}
            {results.map((job) => {
                return (
                    <Box mt={2} ml={14} >
                        <JobCard key={job._id} {...job} />
                    </Box>
                )
            }
            )}
        </Container>
    );
}

export default JobListPage;