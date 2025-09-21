import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './MovieDetalis.css'


const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
            .then(res => res.json())
            .then(data => setMovie(data));
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
            .then(res => res.json())
            .then(data => setCast(data.cast));
    }, [id]);

    if (!movie) return <h2>Loding..</h2>;

    return (
        <div className='movie-details'>
            <div className='movie-header'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                    className='movie-poster' />
                <div className='movie-info'>
                    <h1 className='movie-title'>{movie.title}</h1>
                    <p className='movie-release'><strong>Release Date:</strong>{movie.release_date}</p>
                    <p className='movie-overview'><strong>Story;</strong>{movie.overview}</p>

                </div>
            </div>

            <div className='movie-cast'>
                <h2>Top Cast</h2>
                <div className='cast-list'>
                    {cast.slice(0, 20).map(actor => (
                        <div className='cast-card'
                            key={actor.cast_id}>
                            <img
                                src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`}
                                alt={actor.name} ></img>
                            {actor.name} <em> (as {actor.character})</em>

                        </div>



                    ))}

                </div>

            </div>
        </div>

    );

};
export default MovieDetails;