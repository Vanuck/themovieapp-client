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
    <Card className="moviecard h-100" style={{ cursor: "pointer" }}>
      <br />
      <Link
        to={`/movies/${encodeURIComponent(movie._id)}`}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant="top" src={movie.Image} alt={movie.Title} />

        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>

          <Card.Text>{movie.Director.Name}</Card.Text>
        </Card.Body>
      </Link>

      <div className="favorite-btns ">
        {!isFavorite ? (
          <Button
            variant="bottom"
            className="fav-btn"
            onClick={() => addFav(movie._id)}
          >
            Add to Favorites
          </Button>
        ) : (
          <Button
            variant="bottom"
            className="fav-btn"
            onClick={() => removeFav(movie._id)}
          >
            Remove From Favorites
          </Button>
        )}
      </div>
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
