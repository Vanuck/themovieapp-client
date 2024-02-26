import "./movie-view.scss";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

document.body.style = "background: black;";

export const MovieView = ({ movie, onBackClick }) => {
  return (
    <Row className="mt-5 justify-content-center">
      <Col md={5}>
        <img src={movie.Image} alt="movie cover" className="img-fluid" />
      </Col>
      <Col md={5}>
        <div className="my-1">
          <span className="h1">Title: </span>
          <span>{movie.Title}</span>
        </div>
        <div className="my-1">
          <span className="h1">Description: </span>
          <span>{movie.Description}</span>
        </div>
        <div className="my-1">
          <span className="h1">Director: </span>
          <span>{movie.Director.Name}</span>
        </div>
        <div className="my-1">
          <span className="h1">Genre: </span>
          <span>{movie.Genre.Name}</span>
        </div>
        <div className="my-1">
          <span className="h1">Year: </span>
          <span>{movie.Year}</span>
        </div>
        <Button onClick={onBackClick} className="back-button" size="xl">
          Back
        </Button>
      </Col>
    </Row>
  );
};
