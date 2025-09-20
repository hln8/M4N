import React, {useEffect, useState} from 'react'
import './movieList.css'
import { useParams } from 'react-router-dom'
import Cards from '../Cards/Cards'
import { Upcoming } from '@mui/icons-material'

const MovieList = () => {
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);

  useEffect(() => {
    getData("top_rated", setTopRated);
    getData("popular", setPopular);
    getData("now_playing", setNowPlaying);
    getData("upcoming", setUpcoming);
  }, []);

  const getData = (type, setState) => {
    fetch(`https://api.themoviedb.org/3/movie/${type}?api_key=ebe99bbe7c3aadee21ea5ad3e5ff9bbf&language=en-US`)
      .then(res => res.json())
      .then(data => setState(data.results));
  };

  const formatTitle = (type) => {
    if(type === "top_rated") return "Top Rated";
    if(type === "now_playing") return "Now Playing";
    if(type === "popular") return "Popular";
    if(type === "upcoming") return "Upcoming";
    return type;
  };

  return (
    <div>
      <div className='movie__list'>
        <h2 className='list__title'>{formatTitle("top_rated")}</h2>
        <div className='list__cards'>
          {topRated.slice(0, 11).map(movie => <Cards movie={movie} key={movie.id} />)}
        </div>
      </div>

      <div className='movie__list'>
        <h2 className='list__title'>{formatTitle("popular")}</h2>
        <div className='list__cards'>
          {popular.slice(0, 11).map(movie => <Cards movie={movie} key={movie.id} />)}
        </div>
      </div>

      <div className='movie__list'>
        <h2 className='list__title'>{formatTitle("now_playing")}</h2>
        <div className='list__cards'>
          {nowPlaying.slice(0, 11).map(movie => <Cards movie={movie} key={movie.id} />)}
        </div>
      </div>

      <div className='movie__list'>
        <h2 className='list__title'>{formatTitle("upcoming")}</h2>
        <div className='list__cards'>
          {upcoming.slice(2, 13).map(movie => <Cards movie={movie} key={movie.id} />)}
        </div>
      </div>
    </div>
  );
};
export default MovieList