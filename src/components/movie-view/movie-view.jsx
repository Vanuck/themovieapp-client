import "./movie-view.scss";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";

document.body.style = "background: black;";

export const MovieView = ({ movies }) => {
  const { movieId } = useParams();

  const movie = movies.find((movie) => movie._id === movieId);

  console.log(movieId);
  /* const centeredStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  }; */
  return (
    <Card className="my-5">
      <Row>
        <Col md={9} className="col-10">
          <img src={movie.Image} alt="movie cover" className="mx-auto w-100" />
        </Col>
        <Col>
          <Card.Title className="my-1"> {movie.Title}</Card.Title>

          <Card.Text>{movie.Description}</Card.Text>
          <Card.Text>
            <span className="text-title">Director:</span> {movie.Director.Name}
          </Card.Text>
          <Card.Text>
            <span className="text-title">Genre:</span> {movie.Genre.Name}
          </Card.Text>
          <Card.Text>
            <span className="text-title">Year:</span> {movie.Year}
          </Card.Text>

          <Link to={`/`}>
            <Button className="my-2">Back</Button>
          </Link>
        </Col>
      </Row>
    </Card>
  );
};
