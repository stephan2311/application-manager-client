import { useState } from "react";
import axios from "axios";
import { Box, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, ButtonGroup, Input, Radio, RadioGroup, Select, Stack, Heading, Container } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

function AddCompany(props) {
    const [name, setName] = useState("");
    const [website, setWebsite] = useState("");
    const [address, setAddress] = useState({ street: "", city: "", zip: "", country: "" });

    // const [query, updateQuery] = useState('');
    // const [searchResults, setSearchResults] = useState('');

    // function onSearch({ currentTarget }) {
    //     updateQuery(currentTarget.value);
    // }

    // let searchOptions = {
    //     method: 'GET',
    //     url: 'https://company-search2.p.rapidapi.com/companies/search',
    //     params: { search_term: query, page: '1' },
    //     headers: {
    //         'x-rapidapi-host': 'company-search2.p.rapidapi.com',
    //         'x-rapidapi-key': '9b63168696mshcae480fa310d4a9p169ab1jsn90c0a9dc9773'
    //     }
    // };

    // axios.request(searchOptions)
    //     .then((response) => {
    //         const result = response.data;
    //         setSearchResults(result)
    //     })
    //     .catch((error) => console.log(error));

    
    //     console.log(searchResults.company)


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
                navigate(-1);
            })
            .catch((error) => console.log(error));
    };


    return (
        <div>
            <Box m={50}>
                <Heading>Add Company</Heading>

                <form onSubmit={handleSubmit}>
                    <FormLabel mt={2} htmlFor="name">Name:</FormLabel>
                    <Input
                        placeholder="Company Name"
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormLabel mt={2} htmlFor="website">Website:</FormLabel>
                    <Input
                        type="url"
                        id="website"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                    />

                    <FormLabel mt={2} htmlFor="address">Address:</FormLabel>
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
                    <Button mt={2} type="submit">Submit</Button>
                </form>
                <Button mt={2} onClick={() => navigate(-1)}>Back</Button>
            </Box>
        </div>
    );
}

export default AddCompany;
