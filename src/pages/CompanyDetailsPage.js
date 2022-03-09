import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import { Heading } from "@chakra-ui/react";
import { LinkIcon } from "@chakra-ui/icons";


function CompanyDetailsPage(props) {
    const [company, setCompany] = useState(null);
    const { companyId } = useParams();

    console.log(process.env.REACT_APP_API_URL);

    const getCompany = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/companies/${companyId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneCompany = response.data;
                setCompany(oneCompany);
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getCompany();
    }, []);


    return (
        <div>

            {company && (
                <>
                    <Heading>{company.name}</Heading>
                    <LinkIcon>{company.website}</LinkIcon>
                </>
            )}

            {/* {application && application.tasks.map((task) => <ApplicationCard key={application._id} {...application} />)} */}

            <Link to="/companies">
                <button>Back to List</button>
            </Link>

            <Link to={`/companies/edit/${companyId}`}>
                <button>Edit Company</button>
            </Link>

        </div>
    );
}

export default CompanyDetailsPage;