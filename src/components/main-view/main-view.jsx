import { useState } from "react";
import { useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view"

export const MainView = () => {
const storedUser = JSON.parse(localStorage.getItem("user"));
const storedToken = localStorage.getItem("token");
const [user, setUser] = useState(storedUser? storedUser : null);
const [token, setToken] = useState(storedToken? storedToken : null);
const [movies, setMovies] = useState([]);

const [selectedMovie, setselectedMovie] = useState(null);
//API Hook
useEffect(() => {
    if (!token) {
        return;
      }
  
   fetch("https://themovieapp-1fbdf8d66a92.herokuapp.com/movies", {
    headers: { Authorization: `Bearer ${token}` }
})
    .then((response) => response.json())
    .then((data) => {
        console.log(data);
      const moviesFromApi = data.map((movie) => {
        return {
          _id: movie._id,
          Title: movie.Title,
          ImagePath: movie.ImagePath,
          Description: movie.Description,
          Genre: {
              Name: movie.Genre.Name
          },
          Director: {
              Name: movie.Director.Name
          }
        };
      });

      setMovies(moviesFromApi);
});
}, [token]);

if (!user) {
    return (
    <>
    <LoginView 
        onLoggedIn={(user, token) => {
            setUser(user);
            setToken(token);
  }}
  />
  or
  <SignupView />
    </>
    );
}

if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} />
    );
}

    if (movies.length === 0) {
        return <div>Nothing to see here!</div>
    }
        
    return (
        <>
            <div>
                {movies.map((movie) => (
                <MovieCard
                  key={movie._id}      
                  movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setselectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
        <button onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</button>
        </>
    )
};

export {MainView};
