import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export const Home = () => {
  const [meets, setMeets] = useState([]);
  const [location, setLocation] = useState("");
  const [user, setUser] = useState({
    name: "",
    password: "",
    location: "",
    interests: [],
    image: "",
    subscribed: [],
    id: "",
  });
  const userId = localStorage.getItem("userLoginDetails") || "";

  useEffect(() => {
    if (userId !== "") {
      axios.get(`http://localhost:8080/users/${userId}`).then((res) => {
        setUser(res.data);
        setLocation(res.data.location);
        setMeets(meets);
      });
    }
    axios.get("http://localhost:8080/meetups").then((res) => {
      setMeets(res.data);
    });
  }, []);

  const filterData = (int) => {
    for (let i = 0; i < user.interests.length; i++) {
      if (user.interests[i] === int) {
        return true;
      }
    }

    // if (user.interests.indexOf(int) !== -1) {
    //   return true;
    // }
    return false;
  };

  const handleSubscriptions = (id) => {
    if (userId === "") {
      return false;
    }
    let temp = user.subscribed;
    for (let i = 0; i < temp.length; i++) {
      if (temp[i] === id) {
        return true;
      }
    }
    return false;
  };

  const handleSort = (a, b) => {
    var aa = a.date.split("-").join(),
      bb = b.date.split("-").join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  };

  return (
    <div className="homeContainer">
      {meets
        .filter((el) => {
          if (location === "") {
            return true;
          }
          if (location === "" && user.interests.length === 0) {
            return true;
          } else if (el.location === location && filterData(el.theme)) {
            return true;
          }
          return false;
        })
        .map((el) => {
          return (
            <Link to={`/meetup/${el.id}`} className="events" key={el.id}>
              {/* add your children here (divs)
              ex : title, theme, description, date, time, location, image(optional)
              the classNames should be also : title, theme, description, date, time, location, image(optional)
             */}

              <div className="title">{el.title}</div>
              <div className="theme">{el.theme}</div>
              <div className="description">{el.description}</div>
              <div className="date">{el.date}</div>
              <div className="time">{el.time}</div>
              <div className="location">{el.location}</div>
              <img src="el.image" alt="" className="image" />
            </Link>
          );
        })}

      <div className="subscribedData">
        <div>
          <select
            value={location} // add value here
            onChange={(e) => {
              setLocation(e.target.value);
            }}
          >
            <option value="">------</option>
            <option value="bangalore">Bangalore</option>
            <option value="kolkata">Kolkata</option>
            <option value="delhi">Delhi</option>
            <option value="mumbai">Mumbai</option>
          </select>
        </div>
        {userId !== "" ? <Link to={`/addmeetup`}> Add Meetup</Link> : ""}
        <h1>Subscribed Events</h1>
        <div className="subscribedEvents">
          {/* All user subcribed events should be displayed here in an ascending order of date */}

          {meets
            .filter((el) => {
              return (
                handleSubscriptions(el.id) &&
                (location === "" || el.location === location)
              );
            })
            .sort(function (a, b) {
              return handleSort(a, b);
            })
            .map((el) => {
              return (
                <Link to={`/meetup/${el.id}`} className="events" key={el.id}>
                  {/* Each event should have these elements/children (divs):
                    ex : title, theme, description, date, time, location, image(optional)
                    the classNames should be also : title, theme, description, date, time, location, image(optional) */}
                  <div className="title">{el.title}</div>
                  <div className="theme">{el.theme}</div>
                  <div className="description">{el.description}</div>
                  <div className="date">{el.date}</div>
                  <div className="time">{el.time}</div>
                  <div className="location">{el.location}</div>
                  <img src="el.image" alt="" className="image" />
                </Link>
              );
            })}
        </div>
      </div>
    </div>
  );
};
