import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, FormLabel, Heading, Input, Radio, RadioGroup, Stack } from '@chakra-ui/react'
import axios from "axios";


function EditApplicationPage(props) {
    const [position, setPosition] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [job_post_url, setJobPostUrl] = useState("");
    const [channel, setChannel] = useState("");
    const [status, setStatus] = useState("");

    const { applicationId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${process.env.REACT_APP_API_URL}/applications/${applicationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneApplication = response.data;
                setPosition(oneApplication.position);
                setDateApplied(oneApplication.dateApplied);
                setJobPostUrl(oneApplication.job_post_url);
                setChannel(oneApplication.channel);
                setStatus(oneApplication.status);
            })
            .catch((error) => console.log(error));

    }, [applicationId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { position, dateApplied, job_post_url, channel, status };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(`${process.env.REACT_APP_API_URL}/applications/${applicationId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                navigate(`/applications/${applicationId}`)
            });
    };


    const deleteProject = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .delete(`${process.env.REACT_APP_API_URL}/applications/${applicationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/applications");
            })
            .catch((err) => console.log(err));
    };


    return (
        <Box m={100}>
            <Heading>Edit the Application</Heading>

            <form onSubmit={handleFormSubmit}>
                <FormLabel mt={3}>Position:</FormLabel>
                <Input
                    placeholder="Position"
                    type="text"
                    name="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />

                <FormLabel mt={3}>Day applied:</FormLabel>
                <Input
                    type="date"
                    name="dateApplied"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                />

                <FormLabel mt={3}>Job Post URL:</FormLabel>
                <Input
                    type="url"
                    name="job_post_url"
                    value={job_post_url}
                    onChange={(e) => setJobPostUrl(e.target.value)}
                />

                <RadioGroup mt={3} onChange={setChannel} value={channel}>
                    <Stack direction='row'>
                        <FormLabel name="channel">Channel:</FormLabel>
                        <Radio value='Personal Intro/Recommendation'>Personal Intro/Recommendation</Radio>
                        <Radio value='Mail'>Mail</Radio>
                        <Radio value='LinkedIn'>LinkedIn</Radio>
                        <Radio value='Website'>Website</Radio>
                        <Radio value='Others'>Others</Radio>
                    </Stack>
                </RadioGroup>


                <RadioGroup mt={3} onChange={setStatus} value={status}>
                    <Stack spacing={5} direction='row'>
                        <FormLabel name="status">Status:</FormLabel>
                        <Radio colorScheme='blue' value='submitted'>
                            Submitted
                        </Radio>
                        <Radio colorScheme='orange' value='pending'>
                            Pending
                        </Radio>
                        <Radio colorScheme='yellow' value='reminder'>
                            Reminder
                        </Radio>
                        <Radio colorScheme='green' value='offer'>
                            Offer
                        </Radio>
                        <Radio colorScheme='red' value='rejected'>
                            Rejected
                        </Radio>
                    </Stack>
                </RadioGroup>

                <Button m={3} type="submit">Update Project</Button>
            </form>

            <Button m={3} onClick={deleteProject}>Delete Project</Button>
        </Box>
    );
}

export default EditApplicationPage;