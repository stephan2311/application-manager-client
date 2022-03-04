import { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, ButtonGroup, Input, Radio, RadioGroup, Select, Stack } from '@chakra-ui/react'

function AddApplication(props) {
    const [position, setPosition] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [job_post_url, setJobPostUrl] = useState("");
    const [channel, setChannel] = useState("");
    const [status, setStatus] = useState("");

    const API_URL = "http://localhost:5005/api";

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { position, dateApplied, job_post_url, channel, status };

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${API_URL}/applications`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setPosition("");
                setDateApplied("");
                setJobPostUrl("");
                setChannel("");
                setStatus("");
            })
            .catch((error) => console.log(error));
    };


    return (
        <Box margin={10}>
            <h3>Add Application</h3>

            <form onSubmit={handleSubmit}>
                <FormLabel htmlFor="position">Position:</FormLabel>
                <Input
                    placeholder="Position"
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />

                <FormLabel htmlFor="dateApplied">Day applied:</FormLabel>
                <Input
                    type="date"
                    id="dateApplied"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                />

                <FormLabel htmlFor="job_post_url">Job Post URL:</FormLabel>
                <Input
                    type="url"
                    id="job_post_url"
                    value={job_post_url}
                    onChange={(e) => setJobPostUrl(e.target.value)}
                />

                <RadioGroup onChange={setChannel} value={channel}>
                    <Stack direction='row'>
                        <label name="channel">Channel:</label>
                        <Radio value='Personal Intro/Recommendation'>Personal Intro/Recommendation</Radio>
                        <Radio value='Mail'>Mail</Radio>
                        <Radio value='LinkedIn'>LinkedIn</Radio>
                        <Radio value='Website'>Website</Radio>
                        <Radio value='Others'>Others</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup onChange={setStatus} value={status}>
                    <Stack spacing={5} direction='row'>
                        <label name="status">Status:</label>
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

                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default AddApplication;
