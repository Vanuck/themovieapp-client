import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./movie-card.scss";

export const MovieCard = ({ movie, token, user, setUser }) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (user.favoriteMovies && user.favoriteMovies.includes(movie._id)) {
      setIsFavorite(true);
    }
  }, [user]);

  const addFavoriteMovie = () => {
    fetch(
      `https://themovieapp-1fbdf8d66a92.herokuapp.com/users/${user.Username}/movies/${movie._Id}`,
      { method: "POST", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.log("Failed to add fav movie");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully added to favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(true);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const removeFavoriteMovie = () => {
    fetch(
      `https://themovieapp-1fbdf8d66a92.herokuapp.com/users/${user.Username}/movies/${movie._Id}`,
      { method: "DELETE", headers: { Authorization: `Bearer ${token}` } }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
        }
      })
      .then((user) => {
        if (user) {
          alert("successfully deleted from favorites");
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);
          setIsFavorite(false);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Card className="moviecard h-100">
      <br />
      <Card.Img variant="top" src={movie.Image} alt={movie.Title} />

      <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Card.Text>{movie.Director}</Card.Text>
        <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="primary" className="primaryButton">
            Details
          </Button>
        </Link>
        <Card.Body className="favorite-btns">
          {!isFavorite ? (
            <Button className="fav-btn" onClick={addFavoriteMovie}>
              +
            </Button>
          ) : (
            <Button className="fav-btn" onClick={removeFavoriteMovie}>
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
