import { useState, useEffect } from "react";
import axios from "axios";
import CompanyCard from "../components/CompanyCard";
import { Heading } from "@chakra-ui/react";


function CompanyListPage() {
    const [companies, setCompanies] = useState([]);

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


    return (
        <div>
            <div>
                <div>
                    <Heading>Companies</Heading>
                    {companies.map((company) => {
                        console.table(company)
                        return (
                            <div>
                                <CompanyCard key={company._id} {...company} />
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div >

    );
}

export default CompanyListPage;
