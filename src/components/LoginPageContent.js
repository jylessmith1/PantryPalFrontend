import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";

const LoginPageContent = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('https://pantry-pal-backend-r9v7.onrender.com/login', {
      method: 'POST',
      mode: "cors",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(username)
        if (data.success) {
          navigate("https://pantry-pal-1a32.onrender.com/");
        } else {
          console.log(data.error);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });

      
  };

  return (
    <form onSubmit={handleSubmit}>
      <article>
        <header>
          <h4>Login</h4>
        </header>

        <div className="LoginWrapper">
          <section className="inputCredentials">
            <div className="inputUsername">
              <h6>PLEASE ENTER YOUR USERNAME</h6>
              <input
                type="username"
                name="username"
                value={username}
                id=""
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="inputPassword">
              <h6>PLEASE ENTER YOUR PASSWORD</h6>
              <input
                type="password"
                name="password"
                value={password}
                id=""
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </section>

          <section>
            <div>
              <button type="submit">
                LOG IN
              </button>
            </div>
            <div>
              <Link className="SignUpLink" to="/register">
                Sign Up
              </Link>
            </div>
          </section>
        </div>
      </article>
    </form>
  );
};

export default LoginPageContent;