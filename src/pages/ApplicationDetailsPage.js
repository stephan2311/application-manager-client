import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import AddApplication from "../components/AddApplication";
import ApplicationCard from "../components/ApplicationCard";

// const API_URL = "http://localhost:5005/api";

function ApplicationDetailsPage(props) {
    const [application, setApplication] = useState(null);
    const { applicationId } = useParams();

    console.log(process.env.REACT_APP_API_URL);

    const getApplication = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/applications/${applicationId}`,
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
        <div>

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

            <Link to="/applications">
                <button>Back to List</button>
            </Link>

            <Link to={`/applications/edit/${applicationId}`}>
                <button>Edit Application</button>
            </Link>

        </div>
    );
}

export default ApplicationDetailsPage;