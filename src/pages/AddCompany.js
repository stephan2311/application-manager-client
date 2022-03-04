import { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, ButtonGroup, Input, Radio, RadioGroup, Select, Stack, Heading } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function AddCompany(props) {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState({ street: "", city: "", zip: "", country: "" });

    const handleAddressInput = (e) => {
        const newAddress = { ...address };
        newAddress[e.target.name] = e.target.value;
        setAddress(newAddress);
    };

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const requestBody = { name, website, address };

        const storedToken = localStorage.getItem('authToken');

        axios
            .post(
                `${process.env.REACT_APP_API_URL}/companies`,
                requestBody,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                setName("");
                setWebsite("");
                setAddress({ street: "", city: "", zip: "", country: "" });
                navigate("/companies");
            })
            .catch((error) => console.log(error));
    };


    return (
        <Box margin={10}>
            <Heading>Add Company</Heading>

            <form onSubmit={handleSubmit}>
                <FormLabel htmlFor="name">Name:</FormLabel>
                <Input
                    placeholder="Company Name"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <FormLabel htmlFor="website">Website:</FormLabel>
                <Input
                    type="url"
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                />

                <FormLabel htmlFor="address">Address:</FormLabel>
                <Input
                    placeholder="Street"
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressInput}
                />
                <Input
                    placeholder="City"
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressInput}
                />
                <Input
                    placeholder="ZIP Code"
                    type="text"
                    name="zip"
                    value={address.zip}
                    onChange={handleAddressInput}
                />
                <Input
                    placeholder="Country"
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressInput}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Box>
    );
}

export default AddCompany;
