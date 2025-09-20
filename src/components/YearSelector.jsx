
import React, { useState } from 'react';
import './YearSelector.css';

const YearSelector = ({ onYearChange }) => {
    const [year, setYear] = useState('2023');

    const handleChange = (event) => {
        const selectedYear = event.target.value;
        setYear(selectedYear);
    };

    return (
        <div className="year-selector-container">
            <h2 className="year-selector-title">Select Oscar {year}</h2>
            <p className="year-selector-instructions">Select a year to view nominees:</p>
            <select className="year-selector" value={year} onChange={handleChange}>
                {Array.from({ length: 2024 - 1928 + 1 }, (_, i) => {
                    const y = 2024 - i;
                    return <option key={y} value={y}>{y}</option>;
                })}
            </select>
            <button
                className="view-nominees-button"
                onClick={() => onYearChange(year)}
            >
                View {year} Nominees
            </button>
        </div>
    );
};

export default YearSelector;
