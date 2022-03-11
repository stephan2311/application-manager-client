import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, ButtonGroup, FormLabel, Heading, Input, Link, Radio, RadioGroup, Stack, useToast, VStack } from '@chakra-ui/react'
import axios from "axios";

function EditCompanyPage(props) {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState({ street: "", city: "", zip: "", country: "" });
    const [applications, setApplications] = useState("");

    const { companyId } = useParams();
    const navigate = useNavigate();

    const handleAddressInput = (e) => {
        const editAddress = { ...address };
        editAddress[e.target.name] = e.target.value;
        setAddress(editAddress);
    };

    const toast = useToast();

    const handleDeleteToast = () => {
        toast({
            title: "Company deleted.",
            description: "",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(`${process.env.REACT_APP_API_URL}/companies/${companyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                const oneCompany = response.data;
                setName(oneCompany.name);
                setWebsite(oneCompany.website);
                setAddress({ street: oneCompany.address.street, city: oneCompany.address.city, zip: oneCompany.address.zip, country: oneCompany.address.country });
            })
            .catch((error) => console.log(error));

    }, [companyId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();
        const requestBody = { name, website, address };

        const storedToken = localStorage.getItem("authToken");

        axios
            .put(`${process.env.REACT_APP_API_URL}/companies/${companyId}`, requestBody, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then((response) => {
                navigate(`/companies/${companyId}`);
            });
    };


    const deleteCompany = () => {

        const storedToken = localStorage.getItem("authToken");

        axios
            .delete(`${process.env.REACT_APP_API_URL}/companies/${companyId}`, { headers: { Authorization: `Bearer ${storedToken}` } })
            .then(() => {
                navigate("/companies");
                handleDeleteToast();
            })
            .catch((err) => console.log(err));
    };


    return (
        <Box m={100}>
            <Heading>Edit Company</Heading>

            <form onSubmit={handleFormSubmit}>
                <FormLabel mt={3}>Name:</FormLabel>
                <Input
                    placeholder="Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormLabel mt={3}>Website:</FormLabel>
                <Input
                    type="url"
                    name="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <FormLabel mt={3} htmlFor="address">Address:</FormLabel>
                <Input
                    placeholder="Street"
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressInput}
                />
                <Input mt={2}
                    placeholder="City"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressInput}
                />
                <Input mt={2}
                    placeholder="ZIP Code"
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleAddressInput}
                />
                <Input mt={2}
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressInput}
                />

                <Button mt={3} type="submit">Update Company</Button>
            </form>

            <VStack>
                <Button mt={3} onClick={deleteCompany}>Delete Company</Button>
                <Link href={`/companies/edit/${companyId}`}>
                    <Button mt={3}>Back to Company</Button>
                </Link>
            </VStack>
        </Box>
    );
}

export default EditCompanyPage;