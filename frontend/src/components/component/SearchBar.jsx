import React, { useState } from "react";
import { AiOutlineSearch } from 'react-icons/ai'
import axios from 'axios'
import SearchProductsList from "../SearchProductsList/SearchProductsList";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getSearchProducts } from "../../features/searchFeatures/searchSlice";

function SearchBar() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [query, setQuery] = useState("");

    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Perform some action with the query
        dispatch(getSearchProducts(query))
        navigate(`/search-results?query=${encodeURIComponent(query)}`)
    };

    return (
        <div class="max-w-lg mx-auto">
            <form onSubmit={handleSubmit}>
                <div className="relative w-full">
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        placeholder="Search..."
                        className="w-full px-4 py-2 border border-gray-300 focus:outline-none h-full "
                    />
                    <button
                        type="submit"
                        className="h-full absolute top-0 right-0 px-4 py-2 bg-[#28844b] text-white focus:outline-none "
                    >
                        <AiOutlineSearch />
                    </button>
                </div>

            </form>
        </div>
    );
}

export default SearchBar;