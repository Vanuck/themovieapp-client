import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        
        event.preventDefault();
    
        const data = {
            Username: username,
            Password: password
          };
    
        fetch("https://themovieapp-1fbdf8d66a92.herokuapp.com/movies", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
          console.log("Login response: ", data);
          if (data.user) {
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", data.token);
            onLoggedIn(data.user, data.token);
          } else {
            alert("User Negative");
          }
        })
        .catch((e) => {
          alert("Hal, I think we have a problem");
        });
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            minLength="6"
            />
          </label>
          <label>
            Password:
            <input type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          />
          </label>
          <button type="submit">
            Submit
          </button>
        </form>
      );
    }