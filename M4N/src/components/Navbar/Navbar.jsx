import './Navbar.css';
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import SearchIcon from "@mui/icons-material/Search";
import m4n_logo from "../../assets/M4N logo.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const navigate = useNavigate();

    const toggleMenu = () => {
    setIsOpen(prev => !prev);
};

    const handleSearchChange = async (e) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term) {
            setLoading(true);
            const API_KEY = 'ebe99bbe7c3aadee21ea5ad3e5ff9bbf';
            try {
                const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${term}`);
                const data = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        } else {
            setResults([]);
        }
    };

    const handleMovieClick = (movie) => {
        navigate('/movie-details', { state: { movie }});
    };

    return (
        <header className='navbar'>
            <img className='logo' src={m4n_logo} alt={'M4N logo'} />
            <form onSubmit={(e) => e.preventDefault()}>
                <div className='search new_search_class'>
                    <SearchIcon className='search_icon' />
                    <input
                        className='search_input'
                        type="search"
                        placeholder="search"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
            </form>
            <nav>
                <div className={`burger ${isOpen ? 'active' : ''}`} onClick={toggleMenu}>
    <span></span>
    <span></span>
    <span></span>
    </div>
                <ul className={`nav_links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#">home</a></li>
                    <li><a href="#">search</a></li>
                    <li><a href="#">about</a></li>
                </ul>
            </nav>
            <a className='cta' href="#">
                <button>
                    sign up
                    <div className='arrow-wrapper'>
                        <div className='arrow'></div>
                    </div>
                </button>
            </a>
            <ul className="results_container">
                {loading ? (
                    <li className="loading_message">loading....</li>
                ) : (
                    results.map(result => (
                        <li key={result.id} onClick={() => handleMovieClick(result)}>
                            {result.poster_path ? (
                                <img 
                                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`} 
                                    alt={result.title} 
                                    className="movie_poster" 
                                />
                            ) : (
                                <div className="no_image">there is no image</div>
                            )}
                            <div>{result.title}</div>
                        </li>
                    ))
                )}
            </ul>
        </header>
    );
};

export default Navbar;