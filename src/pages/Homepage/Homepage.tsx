import React, { useEffect, useState } from "react";
import { fetchMovies } from "../../apis/apis";
import MovieCarousel from "./components/MovieCarousel/MovieCarousel";
import MovieDetail from "./components/MovieDetail/MovieContent";
import styles from "./Homepage.module.css";
import { Movie } from "./models/movie";

export default function Homepage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [movieId, setMovieId] = useState<string>("tt3040964");

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    const data = await fetchMovies();
    setMovies(data);
  };

  const getMovieFromId = (): Movie | undefined => {
    return movies.find((movie) => {
      return movie.Id === movieId;
    });
  };

  return (
    <div className={styles.container}>
      {movies.length !== 0 && (
        <>
          <MovieDetail movie={getMovieFromId()} />
          <MovieCarousel
            movies={movies}
            movieId={movieId}
            handleMovieSelect={setMovieId}
          />
        </>
      )}
    </div>
  );
}
