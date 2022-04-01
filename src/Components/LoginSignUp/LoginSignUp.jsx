import axios from "axios";
import { useState } from "react";
export const LoginSignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    location: "",
    interests: [],
    image: "",
    subscribed: [],
  });
  const handleChangeSignup = (e) => {
    const { className, value } = e.target;
    setFormData({ ...formData, [className]: value });
  };

  const handleSubmitSignup = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/users", formData).then((res) => {
      alert("User Created");
    });
  };

  
  return (
    <div className="loginSignUp">
      <form
        className="signUp"
        onSubmit={(e) => {
          handleSubmitSignup(e);
        }}
      >
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
          required
        />
        <br />
        <select
          value={""}
          className="location"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        >
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <label>Interests</label>
        <br />
        <label>technology</label>
        <input
          type="checkbox"
          className="technology"
          onChange={(event) => {}}
        />
        <br />
        <label>food</label>
        <input
          type="checkbox"
          className="food"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        />
        <br />
        <label>movies</label>
        <input
          type="checkbox"
          className="movies"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        />
        <br />
        <label>culture</label>
        <input
          type="checkbox"
          className="culture"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        />
        <br />
        <label>art</label>
        <input
          type="checkbox"
          className="art"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        />
        <br />
        <label>drama</label>
        <input
          type="checkbox"
          className="drama"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
        />
        <br />
        <label>image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => {
            handleChangeSignup(event);
          }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form className="login" onSubmit={(e) => {}}>
        <h1>Login</h1>
        <label>name</label>
        <input type="text" className="name" onChange={(event) => {}} required />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          onChange={(event) => {}}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
