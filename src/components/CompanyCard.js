import { Link } from "react-router-dom";

function CompanyCard({ name, website, address, _id }) {

    return (
        <div>
            <Link to={`/companies/${_id}`}>
                <h3>{name}</h3>
            </Link>
        </div>
    );
}

export default CompanyCard;
