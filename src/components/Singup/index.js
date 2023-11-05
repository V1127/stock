import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Signup = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation logic
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (data.password.length < 8 || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(data.password)) {
      setError("Password must be at least 8 characters long and contain special characters.");
      return;
    }

    try {
      const url = "http://localhost:3000/api/users";
      const { data: res } = await axios.post(url, data);
      navigate("/login");
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.left}>
          <h2>Have an account ?</h2>
          <Link to="/login">
            <button type="button" className={styles.white_btn}>
              Sign in
            </button>
          </Link>
		  <h4>Other methods</h4>
		  
			<button type="button" className={styles.white_btn}>
              Sign In through Google
        	</button>
			<p>


			</p>
			<button type="button" className={styles.white_btn}>
              Sign up through Facebook
            </button>
        </div>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            <input
              type="text"
              placeholder="First Name*"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name*"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <label htmlFor="email" className={styles.label}>
              Email*
            </label>
            <input
              type="email"
              placeholder="Email*"
              name="email"
              id="email"
              onChange={handleChange}
              value={data.email}
              required
              className={styles.input}
            />
            <label htmlFor="password" className={styles.label}>
              Password*
            </label>
            <input
              type="password"
              placeholder="Password*"
              name="password"
              id="password"
              onChange={handleChange}
              value={data.password}
              required
              className={styles.input}
            />
            <input
              type="password"
              placeholder="Confirm Password*"
              name="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
