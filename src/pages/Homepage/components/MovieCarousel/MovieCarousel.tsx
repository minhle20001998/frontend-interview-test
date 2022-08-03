import React from "react";
import { Carousel } from "../../../../components/Carousel/Carousel";
import { Movie } from "../../models/movie";
import styles from "./MovieCarousel.module.css";
interface MovieCarouselProps {
  movies: Movie[];
  movieId: string;
  handleMovieSelect: React.Dispatch<React.SetStateAction<string>>;
}

export default function MovieCarousel(props: MovieCarouselProps) {
  const renderItem = (movie: Movie) => {
    return (
      <div onClick={() => props.handleMovieSelect(movie.Id)}>
        <img src={movie.Poster} alt={movie.Title} className={styles.poster} />
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <Carousel
        data={props.movies}
        selectedId={props.movieId}
        numItemsDesktop={5}
        numItemsMobile={3}
        renderItem={renderItem}
      />
    </div>
  );
}
