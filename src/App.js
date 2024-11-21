import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Custom styles for UI

const App = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState(null);
    const [filter, setFilter] = useState([]);
    const [error, setError] = useState('');

    const handleSubmit = async () => {
        try {
            setError('');
            const parsedInput = JSON.parse(input); // Parse input JSON
            const res = await axios.post('http://localhost:3000/bfhl', parsedInput); // API Call
            setResponse(res.data);
            document.title = res.data.roll_number; // Update title to roll number
        } catch (err) {
            setError('Invalid JSON or API Error!');
            console.error(err);
        }
    };

    const renderResponse = () => {
        if (!response) return null;
        let filteredResponse = {};
        if (filter.includes('Alphabets')) filteredResponse.alphabets = response.alphabets;
        if (filter.includes('Numbers')) filteredResponse.numbers = response.numbers;
        if (filter.includes('Highest lowercase alphabet')) filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
        return filteredResponse;
    };

    return (
        <div className="app-container">
            <h1>Backend Frontend</h1>
            <textarea
                rows="5"
                cols="50"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder='Enter JSON input here...'
                className="text-input"
            />
            <br />
            <button onClick={handleSubmit} className="submit-button">Submit</button>
            {error && <p className="error-text">{error}</p>}
            {response && (
                <>
                    <div className="dropdown-container">
                        <label htmlFor="filter">Filter Response:</label>
                        <select
                            id="filter"
                            multiple
                            className="multi-select"
                            onChange={(e) => setFilter([...e.target.selectedOptions].map((opt) => opt.value))}
                        >
                            <option value="Alphabets">Alphabets</option>
                            <option value="Numbers">Numbers</option>
                            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                        </select>
                    </div>
                    <div className="response-display">
                        <h3>Filtered Response:</h3>
                        <pre>{JSON.stringify(renderResponse(), null, 2)}</pre>
                    </div>
                </>
            )}
        </div>
    );
};

export default App;
