import React from "react";
import useCheckScreen from "../../../../hooks/useCheckScreen";
import { Movie } from "../../models/movie";
import styles from "./MovieContent.module.css";
interface MovieContentProps {
  movie: Movie | undefined;
}

export default function MovieContent(props: MovieContentProps) {
  const isMobileView = useCheckScreen();

  const renderFirstHalfContent = () => {
    if (!props.movie) {
      return <></>;
    }

    return <>
      <div className={`${styles.inline} ${styles.ratingVote}`}>
        <span
          className={`${styles.rating} ${caculateRating(
            parseInt(props.movie.Rating)
          )}`}
        >
          {genenrateDetail({ Rating: props.movie.Rating }, ` / 10 ·`, true)}
        </span>
        {genenrateDetail({ Votes: props.movie.Votes }, " votes", true)}
      </div>
      <div>{genenrateDetail({ Runtime: props.movie.Runtime })}</div>
      <div className={styles.top}>
        {genenrateDetail({ Genre: props.movie.Genre })}
        {genenrateDetail({ Released: props.movie.Released })}
        {genenrateDetail({ DVD: props.movie.DVD })}
        {genenrateDetail({ Rated: props.movie.Rated })}
        {genenrateDetail({ Language: props.movie.Language })}
        {genenrateDetail({ Country: props.movie.Country })}
      </div>
    </>
  }

  const caculateRating = (rating: number) => {
    if (isNaN(rating)) {
      return "";
    }
    if (rating >= 8) {
      return styles.ratingGood;
    } else if (rating >= 5 && rating < 8) {
      return styles.ratingMedium;
    } else {
      return styles.ratingBad;
    }
  };

  const genenrateDetail = (
    detail: { [id: string]: string },
    extraText?: string,
    withoutTitle?: boolean
  ) => {
    const title = Object.keys(detail)[0];
    const content = detail[title];

    if (content === "N/A") {
      return <></>;
    }

    return (
      <div className={styles.block}>
        {!withoutTitle && <b>{title}: &nbsp;</b>}
        {content + (extraText ? extraText : "")}
      </div>
    );
  };


  if (!isMobileView) {
    return (
      <div className={styles.container}>
        <div className={styles.poster}>
          <img src={props.movie?.Poster} alt={props.movie?.Title} />
        </div>
        <div className={styles.content}>
          <h3 className={`${styles.title} ${styles.boxReverse}`}>
            {props.movie?.Title}
          </h3>
          <MovieDetail movie={props.movie} renderFirstHalfContent={renderFirstHalfContent} genenrateDetail={genenrateDetail} />
        </div>
      </div>
    );
  }
  else {
    return (
      <div className={styles.container}>
        <div>
          <h3 className={`${styles.title} ${styles.boxReverse}`}>
            {props.movie?.Title}
          </h3>
          <div className={styles.box}>
            {renderFirstHalfContent()}
          </div>
        </div>
        <div className={styles["mobile-container"]}>
          <div className={styles.poster}>
            <img src={props.movie?.Poster} alt={props.movie?.Title} />
          </div>
          <div className={styles.content}>
            <MovieDetail movie={props.movie} renderFirstHalfContent={renderFirstHalfContent} genenrateDetail={genenrateDetail} />
          </div>
        </div>
      </div>
    );
  }
}

interface MovieDetailProps {
  movie: Movie | undefined,
  renderFirstHalfContent: () => JSX.Element
  genenrateDetail: (detail: { [id: string]: string }, extraText?: string, withoutTitle?: boolean) => JSX.Element
}

function MovieDetail(props: MovieDetailProps) {
  const isMobileView = useCheckScreen();

  if (!props.movie) {
    return <></>;
  }

  const renderSecondHalfContent = () => {
    if (!props.movie) {
      return <></>
    }
    return <>
      <div>{props.genenrateDetail({ Plot: props.movie.Plot })}</div>
      <div>{props.genenrateDetail({ Type: props.movie.Type })}</div>
      <div>{props.genenrateDetail({ Production: props.movie.Production })}</div>
      <div>{props.genenrateDetail({ Director: props.movie.Director })}</div>
      <div>{props.genenrateDetail({ Writer: props.movie.Writer })}</div>
      <div>{props.genenrateDetail({ Actors: props.movie.Actors })}</div>
      <div>{props.genenrateDetail({ BoxOffice: props.movie.BoxOffice })}</div>
      <div>{props.genenrateDetail({ Awards: props.movie.Awards })}</div>
    </>
  }

  return (
    <div className={`${styles.detail} ${!isMobileView ? styles.box : styles["box-shadow"]}`}>
      {!isMobileView && props.renderFirstHalfContent()}
      {!isMobileView && <hr style={{ marginBottom: '1rem' }} />}
      {renderSecondHalfContent()}
    </div>
  );
}
