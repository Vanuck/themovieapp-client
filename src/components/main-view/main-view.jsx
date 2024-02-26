import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setselectedMovie] = useState(null);

  //API Hook
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch("https://themovieapp-1fbdf8d66a92.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            _id: movie._id,
            Title: movie.Title,
            Image: movie.Image,
            Description: movie.Description,
            Year: movie.Year,
            Genre: {
              Name: movie.Genre.Name,
            },
            Director: {
              Name: movie.Director.Name,
            },
          };
        });

        setMovies(moviesFromApi);
      });
  }, [token]);

  if (!user) {
    return (
      <Row className="justify-content-md-center mt-5">
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          or
          <SignupView />
        </Col>
      </Row>
    );
  }

  if (selectedMovie) {
    return (
      <MovieView
        movie={selectedMovie}
        onBackClick={() => setselectedMovie(null)}
      />
    );
  }
  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <div>Nothing to see here!</div>
        </Col>
      </Row>
    );
  }
  return (
    <Row className="justify-content-md-center">
      {movies.map((movie) => (
        <Col md={3} className="mb-5" key={movie._id}>
          <MovieCard
            movie={movie}
            onMovieClick={(newSelectedMovie) => {
              setselectedMovie(newSelectedMovie);
            }}
          />
        </Col>
      ))}
      <Button
        onClick={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
      >
        Logout
      </Button>
    </Row>
  );
};
