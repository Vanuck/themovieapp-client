import "./movie-view.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";

document.body.style = "background: black;";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);

  console.log(movieId);

  return (
    <Card className="poster">
      <Card.Img variant="top" src={movie.Image} alt="movie cover" />
      <Card.Body>
        {/* <Card.Title>{movie.Title}</Card.Title> */}
        <Card.Text>
          <span className="text-title">Director:</span> {movie.Director.Name}
        </Card.Text>
        <Card.Text>
          <span className="text-title">Author:</span> {movie.Author}
        </Card.Text>
        <Card.Text>
          <span className="text-title">Genre:</span> {movie.Genre.Name}
        </Card.Text>
        <Card.Text>
          <span className="text-title">Year:</span> {movie.Year}
        </Card.Text>
        <Card.Text>
          <span className="text-title">Description:</span> {movie.Description}
        </Card.Text>
        <Card.Text>
          <span className="text-title">Famous Line: "</span>
          {movie.Line} <span> "</span>
        </Card.Text>
        <Link to={`/`}>
          <div className="back-button">
            <Button className="back" style={{ color: "yellow" }}>
              > Click Here To Return to Main Movie Page
            </Button>
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
};
