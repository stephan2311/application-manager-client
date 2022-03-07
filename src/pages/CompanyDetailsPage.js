import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";


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
                    <h1>{company.position}</h1>
                    <p>{company.dateApplied}</p>
                    <p>{company.website}</p>
                    <p>{company.status}</p>
                    <p>{company.company}</p>
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