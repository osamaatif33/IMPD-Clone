import React, { useEffect, useState } from "react";
import "./MovieList.css";
import Card from "../card/Card";
import { useParams } from "react-router-dom";

const MovieList = () => {
    
    const [movieList, setMovieList] = useState([ ]);
    const { type } = useParams();

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => setMovieList(data.results))
            .catch(error => console.error("Error fetching data:", error));
    }

    useEffect(() => {
        getData();
    }, [type]);



    return (
        <div className="movie__list">
            <h2 className="list__title">
                {(type ? type : "POPULAR").toUpperCase()}
            </h2>
            <div className="list__cards">
            {
                movieList && movieList.map(movie => (
                    <Card movie={movie} key={movie.id} />  
                ))
            }
            </div>
        </div>
    );
}

export default MovieList;
