import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();   // ✅ use lowercase `navigate` (not `Navigate`)
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const responseData = await response.json(); // ✅ parse response

      if (response.ok) {
        console.log("Login successful:", responseData);

        // ✅ store token if backend sends it
        if (responseData.token) {
          storeTokenInLS(responseData.token);
        }

        alert("Login Successful");
        setUser({ email: "", password: "" });

        // redirect to home
        navigate("/");
      } else {
        alert(responseData.message || "Invalid credentials");
        console.log("Invalid credentials:", responseData);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-login">
            <div className="container grid grid-two-cols">
              <div className="Login-image reg-img">
                <img
                  src="/images/end-user.png"
                  alt="Login Form"
                  width="500"
                  height="500"
                />
              </div>

              <div className="form-container">
                <h1 className="main-heading mb-3">LOGIN HERE</h1>
                <br />
                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="email">EMAIL</label>
                    <input
                      type="email"   // ✅ better than "text"
                      name="email"
                      value={user.email}
                      onChange={handleInput}
                      placeholder="Email"
                      autoComplete="off"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="password">PASSWORD</label>
                    <input
                      type="password"
                      name="password"
                      value={user.password}
                      onChange={handleInput}
                      placeholder="Password"
                      required
                    />
                  </div>
                  <br />

                  <button type="submit" className="btn btn-submit">
                    LOGIN
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Login;
