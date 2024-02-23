import PropTypes from "prop-types";
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card
      className="movie-card h-100"
      onClick={() => {
        onMovieClick(movie);
      }}
    >
      <Card.Img variant="top" src={movie.image} alt={movie.Title} />
      <Card.Body>
        <Card.Title className="movie.Title">
          <span className="titleText">{movie.Title}</span>
        </Card.Title>
        <Card.Text>{movie.director.Name}</Card.Text>
      </Card.Body>
      <Button onClick={() => onMovieClick(movie)} variant="link">
        Open
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
