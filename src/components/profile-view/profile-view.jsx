import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Col, Row, Container } from "react-bootstrap";
import { Button, Card, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import { useDispatch, useSelector } from "react-redux";
import topsters2 from "../../../img/topsters2.png";
import "./profile-view.scss";
import { setUserData, clearUser } from "../../redux/slices/user";

export const ProfileView = ({ removeFav, addFav }) => {
  // get user and movies from redux
  const movies = useSelector((state) => state.movies?.data);
  const user = useSelector((state) => state.user?.userData);
  const token = useSelector((state) => state.user?.token);
  const dispatch = useDispatch();

  const [username, setUsername] = useState(user?.Username);
  const [email, setEmail] = useState(user?.Email);
  const [birthday, setBirthday] = useState(user?.Birthday);

  const navigate = useNavigate();

  const favoriteMovieList = movies?.filter((m) =>
    user?.FavoriteMovies.includes(m._id)
  );

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Email: email,
      Birthday: birthday,
    };

    fetch(
      `https://themovieapp-d539f95ea100.herokuapp.com/users/${user.Username}`,
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    )
      .then(async (response) => {
        console.log(response);
        if (response.ok) {
          const updatedUser = await response.json();
          dispatch(setUserData(updatedUser));
          alert("Update successful");
        } else {
          alert("Update incomplete");
        }
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  };

  const handleDelete = () => {
    fetch(
      `https://themovieapp-d539f95ea100.herokuapp.com/users/${user.Username}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((response) => {
      if (response.ok) {
        dispatch(clearUser());
        alert("User has been deleted");

        navigate("/");
      } else {
        alert("Something went wrong.");
      }
    });
  };

  return (
    <Container className="my-5">
      <h1 style={{ color: "white" }}>Profile</h1>
      <Row>
        <Col md={5}>
          <Card className="profileCard">
            <Card.Body>
              <Card.Title>My Profile</Card.Title>
              <Card.Img
                className="topsters2"
                variant="top"
                src={topsters2}
                fluid="true"
              />
              <Card.Text style={{ color: "indigo" }}>
                {" "}
                Username: {user.Username}
              </Card.Text>
              <Card.Text style={{ color: "indigo" }}>
                Email: {user.Email}
              </Card.Text>
              <Card.Text style={{ color: "indigo" }}>
                Birthday: {user.Birthday}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={7}>
          <Form onSubmit={handleUpdate}>
            <Form.Group controlId="formUsername">
              <Form.Label style={{ color: "white" }}>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                minLength="6"
                placeholder="Type username"
              />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label style={{ color: "white" }}>Email:</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Type email"
              />
            </Form.Group>
            <Form.Group controlId="formBirthday">
              <Form.Label style={{ color: "white" }}>Birthday:</Form.Label>
              <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                placeholder="Type birthday"
              />
            </Form.Group>
            <Button type="submit" onClick={handleUpdate} className="mt-2">
              Update
            </Button>
            <Button variant="danger" onClick={handleDelete} className="mt-2">
              Delete User
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <h1 style={{ color: "white" }}>Favorite Movies</h1>

        <Row className="justify-content-center">
          {favoriteMovieList?.length !== 0 ? (
            favoriteMovieList?.map((movie) => (
              <Col
                sm={2}
                md={3}
                lg={4}
                xl={5}
                className="mx-2 mt-2 mb-8 col-6 similar-movies-img"
                key={movie._id}
              >
                <MovieCard
                  movie={movie}
                  user={user}
                  removeFav={removeFav}
                  addFav={addFav}
                  isFavorite={user.FavoriteMovies.includes(movie._id)}
                />
              </Col>
            ))
          ) : (
            <Col>
              <h1 style={{ color: "white" }}>
                You do not have any Favorite Movies
              </h1>
            </Col>
          )}
        </Row>
      </Row>
    </Container>
  );
};
