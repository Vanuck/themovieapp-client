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
      <Card.Img variant="top" src={movie.Image} alt={movie.Title} />
      <Card.Body>
        <Card.Title className="movie.Title">
          <span className="titleText">{movie.Title}</span>
        </Card.Title>
        <Card.Text>{movie.Director.Name}</Card.Text>
      </Card.Body>
      <Button onClick={() => onMovieClick(movie)} variant="link">
        Open
      </Button>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
