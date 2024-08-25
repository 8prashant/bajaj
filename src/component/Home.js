import React, { useState } from "react";

export default function Home() {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null); 
    const [error, setError] = useState('');
    const [filters, setFilters] = useState([]); 

    const validateAndSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const apiResponse = await fetch("http://localhost:5000/bfhl", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(parsedJson),
            });

            const result = await apiResponse.json();
            setResponse(result); 
            setError('');
        } catch (err) {
            setError("Invalid JSON input or error in processing request.");
        }
    };

    const handleFilterChange = (event) => {
        const { value, checked } = event.target;
        setFilters(prevFilters =>
            checked ? [...prevFilters, value] : prevFilters.filter(filter => filter !== value)
        );
    };

    const getFilteredResponse = () => {
        if (!response) return {};
        const filteredResponse = {};
        if (filters.includes("Alphabets")) {
            filteredResponse.alphabets = response.alphabets;
        }
        if (filters.includes("Numbers")) {
            filteredResponse.numbers = response.numbers;
        }
        if (filters.includes("Highest lowercase alphabet")) {
            filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        }
        return filteredResponse;
    };

    return (
        <>
            <div>
                <h1>{response ? response.roll_number : "Enter Your Data"}</h1>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    placeholder="Enter JSON input here"
                ></textarea>
                <button onClick={validateAndSubmit}>Submit</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <div>
                    <label>
                        <input type="checkbox" value="Alphabets" onChange={handleFilterChange} />
                        Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="Numbers" onChange={handleFilterChange} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="Highest lowercase alphabet" onChange={handleFilterChange} />
                        Highest lowercase alphabet
                    </label>
                </div>
                <div>
                    <h2>Filtered Response:</h2>
                    <pre>{JSON.stringify(getFilteredResponse(), null, 2)}</pre>
                </div>
            </div>
        </>
    );
}
