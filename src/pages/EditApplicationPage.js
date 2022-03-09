import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, FormLabel, Heading, Input, Radio, RadioGroup, Stack, Textarea, useToast } from '@chakra-ui/react'
import { useToastHook } from "../components/Toast";
import axios from "axios";

function EditApplicationPage(props) {
    const [position, setPosition] = useState("");
    const [dateApplied, setDateApplied] = useState("");
    const [job_post_url, setJobPostUrl] = useState("");
    const [channel, setChannel] = useState("");
    const [status, setStatus] = useState("");
    const [company, setCompany] = useState("");
    const [contacts, setContacts] = useState({name: "", mail: "", phone: ""});
    const [comment, setComment] = useState("");

    const { applicationId } = useParams();
    const navigate = useNavigate();
    
    const handleContactInput = (e) => {
        const newContact = { ...contacts };
        newContact[e.target.name] = e.target.value;
        setContacts(newContact);
    };

    const toast = useToast();
    
    const handleDeleteToast = () => {
        toast({
            title: "Application deleted.",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${process.env.REACT_APP_API_URL}/account/applications/${applicationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneApplication = response.data;
                setPosition(oneApplication.position);
                setDateApplied(oneApplication.dateApplied);
                setJobPostUrl(oneApplication.job_post_url);
                setChannel(oneApplication.channel);
                setStatus(oneApplication.status);
                setContacts({ name: oneApplication.contacts.name, city: oneApplication.address.mail, zip: oneApplication.address.phone });
                setComment(oneApplication.comment);
            })
            .catch((error) => console.log(error));

    }, [applicationId]);



    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { position, dateApplied, job_post_url, channel, status, company, contacts, comment };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(`${process.env.REACT_APP_API_URL}/account/applications/${applicationId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                setPosition("");
                setDateApplied("");
                setJobPostUrl("");
                setChannel("");
                setStatus("");
                setContacts({ name: "", mail: "", phone: "" });
                setComment("");
                navigate(`/account/applications/${applicationId}`);
            })
            .catch((error) => console.log(error));
    };


    const deleteApplication = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .delete(`${process.env.REACT_APP_API_URL}/account/applications/${applicationId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/account/applications");
                handleDeleteToast();
            })
            .catch((err) => console.log(err));
    };


    return (
        <Box m={50}>
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

                <FormLabel mt={3} htmlFor="contacts">Contact:</FormLabel>
                <Input
                    mt={1}
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={contacts.name}
                    onChange={handleContactInput}
                />
                <Input
                    mt={1}
                    placeholder="E-Mail"
                    type="email"
                    name="mail"
                    value={contacts.mail}
                    onChange={handleContactInput}
                />
                <Input
                    mt={1}
                    placeholder="Phone Number"
                    type="number"
                    name="phone"
                    value={contacts.phone}
                    onChange={handleContactInput}
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

                <Textarea mt={2}
                    type="textfield"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />

                <Button mt={3} type="submit">Update Application</Button>
            </form>

            <Button mt={3} onClick={deleteApplication}>Delete Application</Button>
        </Box>
    );
}

export default EditApplicationPage;