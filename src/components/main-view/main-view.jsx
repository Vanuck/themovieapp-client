import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar.jsx";
import { ProfileView } from "../profile-view/profile-view.jsx";
import { Col, Row } from "react-bootstrap";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setMovies } from "../../redux/slices/movies.js";
import { setUserData, setToken } from "../../redux/slices/user";
import MovieList from "../movie-list/movie-list";

import "./main-view.scss";

export const MainView = () => {
  const movies = useSelector((state) => state.movies?.data);
  const user = useSelector((state) => state.user.userData);
  const token = useSelector((state) => state.user.token);
  const dispatch = useDispatch();

  const [setFav] = useState([]);

  const handleOnLoggedIn = (user, token) => {
    dispatch(setUserData(user));
    dispatch(setToken(token));
  };

  const handleOnLogOut = () => {
    dispatch(setUserData(null));
    dispatch(setToken(token));
  };

  //API Hook
  useEffect(() => {
    if (!token) {
      console.log("No token");
      return;
    }

    fetch(`https://themovieapp-d539f95ea100.herokuapp.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
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

          dispatch(setMovies(moviesfromApi));
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
        dispatch(setUserData(userData));
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
          dispatch(setUserData(data));

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
          //localStorage.setItem("user", JSON.stringify(data));
          dispatch(setUserData(data));

          alert("Removed from favorites!");
        } else {
          alert("Error");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log({ movies, user });
  return (
    <BrowserRouter>
      <NavigationBar user={user} onLoggedOut={handleOnLogOut} />
      <Row className="justify-content-center my-4">
        <Routes>
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <SignupView />}
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginView onLoggedIn={handleOnLoggedIn} />
              )
            }
          />
          <Route
            path="/movies"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>
                  <h2 className="my-4">No movies to display!</h2>
                </Col>
              ) : (
                <MovieList />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              !user ? (
                <Navigate to="/login" replace />
              ) : movies.length === 0 ? (
                <Col>The list is empty!</Col>
              ) : (
                <MovieView />
              )
            }
          />

          <Route
            path="/"
            element={
              !user ? (
                <Navigate to="/login" replace />
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
                      />
                    </Col>
                  ))}
                </>
              )
            }
          />

          <Route
            path="/profile/:username"
            element={
              !user ? (
                <ProfileView addFav={addFav} removeFav={removeFav} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
