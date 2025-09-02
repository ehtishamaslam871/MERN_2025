import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useAuth } from "../../store/auth";

const Register = () => {
const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
});

  // Get the navigate function
const navigate = useNavigate();
const {storeTokenInLS} = useAuth();

const handleInput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser({
    ...user,
    [name]: value,
    });
};

  // handle form on submit
const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(user);

  try {
    const response = await fetch("http://localhost:5000/api/auth/registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.json();

    if (response.ok) {
      console.log("Response from server", responseData);

      // ✅ Store token if available
      if (responseData.token) {
        storeTokenInLS(responseData.token);
      }

      alert("Registration Successful");
      setUser({ username: "", email: "", phone: "", password: "" });

      // Redirect after registration
      navigate("/login");
    } else {
      alert(`Registration failed: ${responseData.message || "Please check your input"}`);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("Registration failed. Please try again later.");
  }
};

return (
    <>
    <section>
        <main>
        <div className="section-registration">
            <div className="container grid grid-two-cols">
            <div className="registration-image reg-img">
                <img
                src="/images/online-registration.png"
                alt="Register Here"
                width="500"
                height="500"
                />
            </div>

              {/* our main registration code  */}
            <div className="form-container">
                <h1 className="main-heading mb-3">REGISTER HERE</h1>
                <br />
                <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">USERNAME</label>
                    <input
                    type="text"
                    name="username"
                    value={user.username}
                    onChange={handleInput}
                    placeholder="Username"
                    required
                    />
                </div>
                <div>
                    <label htmlFor="email">EMAIL</label>
                    <input
                    type="email"  // Changed from text to email for better validation
                    name="email"
                    value={user.email}
                    onChange={handleInput}
                    placeholder="Email"
                    autoComplete="off"
                    required
                    />
                </div>

                <div>
                    <label htmlFor="phone">PHONE</label>
                    <input
                    type="tel"  // Changed from number to tel for better phone number handling
                    name="phone"
                    value={user.phone}
                    onChange={handleInput}
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
                    REGISTER NOW
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

export default Register;