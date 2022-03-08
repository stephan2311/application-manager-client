import { useState, useEffect } from "react";
import { useParams, Link, Outlet } from 'react-router-dom';
import axios from "axios";
import { Box, GridItem } from "@chakra-ui/react";


function ApplicationDetails(props) {
    const { applicationId } = useParams();
    const [application, setApplication] = useState(null);

    const getApplication = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/account/applications/${applicationId}`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => {
                const oneApplication = response.data;
                setApplication(oneApplication);
            })
            .catch((error) => console.log(error));
    };


    useEffect(() => {
        getApplication();
    }, []);


    return (
        <Box>
            {application && (
                <>
                    <h1>{application.position}</h1>
                    <p>{application.dateApplied}</p>
                    <p>{application.website}</p>
                    <p>{application.status}</p>
                    <p>{application.company}</p>
                </>
            )}

            {/* {application && application.tasks.map((task) => <ApplicationCard key={application._id} {...application} />)} */}

            <Link to="/account/applications">
                <button>Back to List</button>
            </Link>

            <Link to={`/account/applications/edit/${applicationId}`}>
                <button>Edit Application</button>
            </Link>

        </Box>
    );
}

export default ApplicationDetails;