import { useState } from "react";
import axios from "axios";
import { userLogin } from "../../Redux/Login/action";
import { useDispatch } from "react-redux";

export const LoginSignUp = () => {
  const dispatch = useDispatch();

  const [signIn, setSignIn] = useState({
    name: "",
    password: "",
    location: "",
    interests: [],
    image: "",
    subscribed: [],
  });

  const handleSignup = ({ name, value }) => {
    setSignIn({ ...signIn, [name]: value });
  };

  const [tech, addTech] = useState(false);
  const [food, addFood] = useState(false);
  const [movies, addMovies] = useState(false);
  const [culture, addCulture] = useState(false);
  const [art, addArt] = useState(false);
  const [drama, addDrama] = useState(false);

  const handleTech = ({ checked }) => {
    addTech(checked);
  };

  const handleFood = ({ checked }) => {
    addFood(checked);
  };

  const handleMovies = ({ checked }) => {
    addMovies(checked);
  };

  const handleCulture = ({ checked }) => {
    addCulture(checked);
  };

  const handleArt = ({ checked }) => {
    addArt(checked);
  };

  const handleDrama = ({ checked }) => {
    addDrama(checked);
  };

  const handleSubmit = () => {
    if (tech) {
      let temp = signIn.interests;
      temp.push("technology");
      setSignIn({ ...signIn, interests: temp });
    }
    if (food) {
      let temp = signIn.interests;
      temp.push("food");
      setSignIn({ ...signIn, interests: temp });
    }
    if (movies) {
      let temp = signIn.interests;
      temp.push("movies");
      setSignIn({ ...signIn, interests: temp });
    }
    if (culture) {
      let temp = signIn.interests;
      temp.push("culture");
      setSignIn({ ...signIn, interests: temp });
    }
    if (art) {
      let temp = signIn.interests;
      temp.push("art");
      setSignIn({ ...signIn, interests: temp });
    }
    if (drama) {
      let temp = signIn.interests;
      temp.push("drama");
      setSignIn({ ...signIn, interests: temp });
    }
    axios
      .post("http://localhost:8080/users", signIn)
      .then((res) => {})
      .catch((er) => {});
  };

  const [logCred, setLogCred] = useState({ name: "", password: "" });

  const handleLogChange = ({ name, value }) => {
    setLogCred({ ...logCred, [name]: value });
  };

  let [users, setUsers] = useState([]);
  const Login = (e) => {
    axios.get("http://localhost:8080/users").then((res) => {
      setUsers(res.data);

      for (let i = 0; i < users.length; i++) {
        if (
          users[i].name === logCred.name &&
          users[i].password === logCred.password
        ) {
          localStorage.setItem("userLoginDetails", users[i].id);
          dispatch(userLogin(users[i]));
        }
      }
    });
  };

  return (
    <div className="loginSignUp">
      <form
        className="signUp"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1>SignUp</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          name="name"
          onChange={(event) => {
            handleSignup(event.target);
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          name="password"
          onChange={(event) => {
            handleSignup(event.target);
          }}
          required
        />
        <br />
        <select
          value={signIn.location}
          className="location"
          name="location"
          onChange={(event) => {
            handleSignup(event.target);
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
          checked={tech}
          className="technology"
          onChange={(event) => {
            handleTech(event.target);
          }}
        />
        <br />
        <label>food</label>
        <input
          type="checkbox"
          className="food"
          checked={food}
          onChange={(event) => {
            handleFood(event.target);
          }}
        />
        <br />
        <label>movies</label>
        <input
          type="checkbox"
          className="movies"
          checked={movies}
          onChange={(event) => {
            handleMovies(event.target);
          }}
        />
        <br />
        <label>culture</label>
        <input
          type="checkbox"
          className="culture"
          checked={culture}
          onChange={(event) => {
            handleCulture(event.target);
          }}
        />
        <br />
        <label>art</label>
        <input
          type="checkbox"
          className="art"
          checked={art}
          onChange={(event) => {
            handleArt(event.target);
          }}
        />
        <br />
        <label>drama</label>
        <input
          type="checkbox"
          className="drama"
          checked={drama}
          onChange={(event) => {
            handleDrama(event.target);
          }}
        />
        <br />
        <label>image</label>
        <input
          type="text"
          className="image"
          name="image"
          onChange={(event) => {
            handleSignup(event.target);
          }}
          required
        />
        <br />
        <input type="submit" className="submitSignUpForm" />
      </form>
      <form
        className="login"
        onSubmit={(e) => {
          e.preventDefault();
          Login();
        }}
      >
        <h1>Login</h1>
        <label>name</label>
        <input
          type="text"
          className="name"
          name="name"
          onChange={(event) => {
            handleLogChange(event.target);
          }}
          required
        />
        <br />
        <label>password</label>
        <input
          type="text"
          className="password"
          name="password"
          onChange={(event) => {
            handleLogChange(event.target);
          }}
          required
        />
        <br />
        <input type="submit" className="submitLoginForm" />
      </form>
    </div>
  );
};
