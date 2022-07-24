import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, Center, Container, Flex, Image, Heading, HStack, Input, InputGroup, Link, Spacer, Spinner, Text } from "@chakra-ui/react";
import JobCard from "../components/JobCard";
import { List } from "react-virtualized";
import moment from "moment";

function JobListPage() {
    const [jobs, setJobs] = useState([]);
    const [fetching, setFetching] = useState(true);
    // const [query, setQuery] = useState("")
    // const [count, setCount] = useState(0);

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

    const renderRow = ({ index, key, style }) => (
        <Box key={key} style={style} className="job" as='article' maxW='md' p='5' borderWidth='1px' rounded='md' m={3}>
            <HStack>
                <Image
                    boxSize='100px'
                    src={jobs[index].company_logo} />
                <Container>
                    <Box as='time' fontWeight='bold'>
                        {moment(jobs[index].publication_date).fromNow()}
                    </Box>
                    <Heading size='md' my='2'>
                        {jobs[index].title}
                    </Heading>
                    <Box as='a' color='teal.400' fontWeight='bold'>
                        {jobs[index].company_name}
                    </Box>
                </Container>
            </HStack>
        </Box>
    )


    return (
        <Container mt={4} >
            <Box textAlign={"center"}>
                <Heading align={'center'} m={4}>Job Posts</Heading>
                <Text>
                    Job Search powered by{' '}
                    <Link color='teal.500' href='https://remotive.io/' isExternal>
                        Remotive.io
                    </Link>
                </Text>
            </Box>
            {fetching && <Spinner></Spinner>}
            <Box mt={10}>
                {jobs.length > 0 ? (
                    <>
                        <List
                            width={2000}
                            height={700}
                            rowRenderer={renderRow}
                            rowCount={jobs.length}
                            rowHeight={150}
                        />
                    </>
                ) : (
                    <h1>No Jobs to display</h1>
                )}
            </Box>
        </Container>
    );
}

export default JobListPage;