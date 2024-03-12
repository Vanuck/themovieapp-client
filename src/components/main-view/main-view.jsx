import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./main-view.scss";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const [movies, setMovies] = useState([]);
  const [favMovies, setFav] = useState([]);

  const handleOnLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
  };

  const handleOnLogOut = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  //API Hook
  useEffect(() => {
    if (!token) {
      return;
    }

    fetch(`https://themovieapp-d539f95ea100.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data) {
          const moviesfromApi = data.map((movie) => {
            return {
              _id: movie._id,
              Title: movie.Title,
              Image: movie.Image,
              Description: movie.Description,
              Year: movie.Year,
              Author: movie.Author,
              Line: movie.Line,
              Genre: {
                Name: movie.Genre.Name,
              },
              Director: {
                Name: movie.Director.Name,
              },
            };
          });

          setMovies(moviesfromApi);
        }
      });
  }, [token]);

  useEffect(() => {
    if (!user) {
      return;
    }

    fetch(
      `https://themovieapp-d539f95ea100.herokuapp.com/users/${user.Username}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        if (!response.ok && response.status === 401) {
          // this means that the token has expired
          handleOnLogOut();
          return;
        }

        const userData = await response.json();
        const userMovies = userData["FavoriteMovies"];
        if (!userMovies) {
          setFav("No favorites yet!");
        } else {
          const findMovies = movies.filter((m) => userMovies.includes(m.id));
          const movieList = [];
          findMovies.forEach((movie) => movieList.push(movie));
          setFav(movieList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const addFav = (movieId) => {
    fetch(
      `https://themovieapp-d539f95ea100.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);

          alert("Added to favorites!");
        } else {
          alert("Did not remove");
        }
      })

      .catch((e) => {
        console.log(e);
      });
  };
  const removeFav = (movieId) => {
    fetch(
      `https://themovieapp-d539f95ea100.herokuapp.com/users/${user.Username}/movies/${movieId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("user", JSON.stringify(data));
          setUser(data);

          alert("Removed from favorites!");
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleOnLogOut} />
      <Row className="justify-content-center my-4">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={6}>
                    <LoginView onLoggedIn={handleOnLoggedIn} />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/profile/:Username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Col md={10}>
                    <Row>
                      <ProfileView
                        movies={movies}
                        user={user}
                        isFavorite={favMovies}
                        setUser={setUser}
                        addFav={addFav}
                        removeFav={removeFav}
                        onDelete={() => {
                          setUser(null);
                          setToken(null);
                          localStorage.clear();
                        }}
                      />
                    </Row>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={10}>
                    <MovieView
                      movies={movies}
                      isFavorite={favMovies}
                      addFav={addFav}
                      removeFav={removeFav}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col
                        className="mb-4"
                        key={`${movie._id}_movie_list`}
                        lg={3}
                        md={4}
                        sm={12}
                      >
                        <MovieCard
                          movie={movie}
                          addFav={addFav}
                          removeFav={removeFav}
                          user={user}
                        />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
