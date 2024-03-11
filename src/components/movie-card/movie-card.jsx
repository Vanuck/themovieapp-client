import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, user, addFav, removeFav }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    if (user.FavoriteMovies && user.FavoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [user]);

  return (
    <Card className="moviecard h-100">
      <br />
      <Card.Img variant="top" src={movie.Image} alt={movie.Title} />

      <Card.Body>
        <Card.Title className="my-1">{movie.Title}</Card.Title>
        {/* <Card.Text>{movie.Description}</Card.Text> */}
        <Card.Text>{movie.Director.Name}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary" className="primaryButton">
            Details
          </Button>
        </Link>
        <Card.Body className="favorite-btns">
          {!isFavorite ? (
            <Button className="fav-btn" onClick={() => addFav(movie._id)}>
              +
            </Button>
          ) : (
            <Button className="fav-btn" onClick={() => removeFav(movie._id)}>
              -
            </Button>
          )}
        </Card.Body>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
    Image: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.object.isRequired,
  }),
};
