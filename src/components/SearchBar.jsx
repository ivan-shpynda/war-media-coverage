import { useState } from "react";
import PropTypes from "prop-types";

export default function SearchBar({ handleSubmit }) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleOnClick = () => {
        setSearchTerm("");
        handleSubmit(searchTerm);
    };

    return (
        <div className="serach-block">
            <label>
                Enter Your Search Term:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </label>
            <button onClick={handleOnClick}>Submit</button>
        </div>
    );
}

SearchBar.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
};
