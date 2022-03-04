import { Link } from "react-router-dom";

function ApplicationCard({ position, dateApplied, company, _id }) {

    return (
        <div>
            <Link to={`/applications/${_id}`}>
                <h3>{position}</h3>
            </Link>
            <p>{dateApplied}</p>
            <p>{company}</p>
        </div>
    );
}

export default ApplicationCard;
