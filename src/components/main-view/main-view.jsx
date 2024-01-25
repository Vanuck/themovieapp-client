import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
    const [movies, setMovies] = useState([
{
    id: 1,
    title: "Reservoir Dogs",
    description: "Six criminals having pseudonyms, and each strangers to one another, are hired to carry out a robbery. The heist is ambushed by police and the gang are forced to shoot their way out. At their warehouse rendezvous, the survivors, realising that they were set up, try to find the traitor in their midst.",
    director: "Quentin Tarantino",
    genre: "Gangster",
    year: "1992",
    image: "./img/reservoirdogs.jfif"
},
{

    id: 2,
    title: "2001:A Space Odyssey",
    description: "When Dr. Dave Bowman and other astronauts are sent on a mysterious mission, their ships computer system, HAL, begins to display increasingly strange behavior, leading up to a tense showdown between man and machine that results in a mind-bending trek through space and time.",
    director: "Stanley Kubrick",
    genre: "Science Fiction",
    Year: "1968",
    image: "./img/2001spaceodyssey.jfif"
},
{
    id: 3,
    title: "The Godfather",
    description:"Don Vito Corleone, head of a mafia family, decides to hand over his empire to his youngest son Michael. However, his decision unintentionally puts the lives of his loved ones in grave danger.",
    director: "Francis Ford Coppola",
    genre: "Gangster",
    Year: "1988",
    image: "./img/Thegodfather.jfif"
}
]);

const [selectedMovie, setselectedMovie] = useState(null);
if (selectedMovie) {
    return (
        <MovieView movie={selectedMovie} onBackClick={() => setselectedMovie(null)} />
    );
}

    if (movies.length === 0) {
        return <div>The list is empty!</div>;
    }

    return (
        <div>
            {movies.map((movie) => (
                    <MovieCard
                    key={movie.id}
                    movie={movie}
                    onMovieClick={(newSelectedMovie) => {
                        setselectedMovie(newSelectedMovie);
                    }}
                />
            ))}
        </div>
    );
};
