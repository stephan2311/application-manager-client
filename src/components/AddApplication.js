import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, ButtonGroup, Input, Radio, RadioGroup, Select, Stack, Spacer, Heading, Textarea } from '@chakra-ui/react';
import { AuthContext } from "../context/auth.context";

function AddApplication() {
    const [position, setPosition] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [job_post_url, setJobPostUrl] = useState("");
    const [channel, setChannel] = useState("");
    const [status, setStatus] = useState("");
    const [companies, setCompanies] = useState([]);
    const [company, setCompany] = useState("");
    const [contact, setContact] = useState([]);
    const [comment, setComment] = useState("");

    const navigate = useNavigate();

    const getAllCompanies = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/companies`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => setCompanies(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllCompanies();
    }, []);

    const handleContactInput = (e) => {
        const newContact = { ...contact };
        newContact[e.target.name] = e.target.value;
        setContact(newContact);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { position, dateApplied, job_post_url, channel, status, company, contact, comment };

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/account/applications`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setPosition("");
                setDateApplied("");
                setJobPostUrl("");
                setChannel("");
                setStatus("");
                setCompany("");
                setContact({ name: "", mail: "", phone: "" });
                setComment("");
                navigate("/account/applications")
            })
            .catch((error) => console.log(error));

    };

    return (
        <Box m={50}>
            <Heading>Add Application</Heading>

            <form onSubmit={handleSubmit}>


                <FormLabel mt={2} htmlFor="companies">Select Company:</FormLabel>
                <Flex>
                    <Select name="companies" onChange={(e) => setCompany(e.target.value)}>
                        {companies.map(item => {
                            return (<option key={item._id} value={item._id}>{item.name}</option>);
                        })}
                    </Select>
                    <Button ml={4} as={Link} to='/companies/create-company'>Add Company</Button>
                </Flex>


                <FormLabel mt={2} htmlFor="position">Position:</FormLabel>
                <Input
                    placeholder="Position"
                    type="text"
                    id="position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />

                <FormLabel mt={2} htmlFor="dateApplied">Day applied:</FormLabel>
                <Input
                    type="date"
                    id="dateApplied"
                    value={dateApplied}
                    onChange={(e) => setDateApplied(e.target.value)}
                />

                <FormLabel mt={2} htmlFor="job_post_url">Job Post URL:</FormLabel>
                <Input
                    type="url"
                    id="job_post_url"
                    value={job_post_url}
                    onChange={(e) => setJobPostUrl(e.target.value)}
                />

                <FormLabel mt={2} htmlFor="contact">Contact:</FormLabel>
                <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleContactInput}
                />
                <Input mt={1}
                    placeholder="E-Mail"
                    type="email"
                    name="mail"
                    value={contact.mail}
                    onChange={handleContactInput}
                />
                <Input mt={1}
                    placeholder="Phone Number"
                    type="number"
                    name="phone"
                    value={contact.phone}
                    onChange={handleContactInput}
                />


                <RadioGroup mt={2} onChange={setChannel} value={channel}>
                    <Stack direction='row'>
                        <label name="channel">Channel:</label>
                        <Radio value='Personal Intro/Recommendation'>Personal Intro/Recommendation</Radio>
                        <Radio value='Mail'>Mail</Radio>
                        <Radio value='LinkedIn'>LinkedIn</Radio>
                        <Radio value='Website'>Website</Radio>
                        <Radio value='Others'>Others</Radio>
                    </Stack>
                </RadioGroup>

                <RadioGroup mt={2} onChange={setStatus} value={status}>
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

                <Textarea mt={2}
                    placeholder="Add some comments here"
                    type="textfield"
                    name="comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <Button mt={2} type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default AddApplication;
