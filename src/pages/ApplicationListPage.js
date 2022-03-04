import { useState, useEffect } from "react";
import axios from "axios";
import ApplicationCard from "../components/ApplicationCard";


function ApplicationListPage() {
    const [applications, setApplications] = useState([]);

    const getAllApplications = () => {
        const storedToken = localStorage.getItem("authToken");
        axios
            .get(
                `${process.env.REACT_APP_API_URL}/applications`,
                { headers: { Authorization: `Bearer ${storedToken}` } }
            )
            .then((response) => setApplications(response.data))
            .catch((error) => console.log(error));
    };

    useEffect(() => {
        getAllApplications();
    }, []);


    return (
        <div>
            <div>
                <div>
                    <h1>Applications</h1>
                    {applications.map((application) => {
                        console.table(application)
                        return (
                            <div>
                                <ApplicationCard key={application._id} {...application} />
                            </div>
                        )
                    }
                    )}
                </div>
            </div>
        </div >

    );
}

export default ApplicationListPage;
