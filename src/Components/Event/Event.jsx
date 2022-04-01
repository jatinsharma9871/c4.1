// This is an event details page which has its own route

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Event = () => {
  const userId = localStorage.getItem("userLoginDetails") || "";
  const { id } = useParams();
  const [el, setEl] = useState({});
  const [sub, setsub] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/meetups/${id}`).then((res) => {
      setEl(res.data);
    });
    if (userId !== "") {
      axios.get(`http://localhost:8080/users/${userId}`).then((res) => {
        setUser(res.data);
        let temp = res.data.subscribed;
        for (let i = 0; i < temp.length; i++) {
          if (temp[i] === +id) {
            setsub(true);
          }
        }
      });
    }
  }, []);

  const Handlesub = (v) => {
    if (v === 1) {
      let temp = user;
      temp.subscribed.push(1);
      axios.patch(`http://localhost:8080/users/${userId}`, temp).then((res) => {
        setUser(res.data);
        setsub(true);
      });
    }
    if (v === 2) {
      let temp = user;
      let her = [];
      for (let i = 0; i < temp.subscribed.length; i++) {
        if (temp.subscribed[i] !== +id) {
          her.push(temp.subscribed[i]);
        }
      }
      temp.subscribed = her;
      axios.patch(`http://localhost:8080/users/${userId}`, temp).then((res) => {
        setUser(res.data);
        setsub(false);
      });
    }
  };

  return (
    <div className="eventContainer">
      {/* add your children here (divs)
      ex : title, theme, description, date, time, location, image(optional)
      the classNames should be also : title, theme, description, date, time, location, image(optional)
      */}

      {/* only one of the buttons should be visible depending on the status of subcription
      Hint : use conditional rendering */}

      <div className="theme">{el.theme}</div>
      <div className="description">{el.description}</div>
      <div className="date">{el.date}</div>
      <div className="time">{el.time}</div>
      <div className="location">{el.location}</div>
      <img src="el.image" alt="" className="image" />
      {sub ? (
        <button
          className="unsubscribe"
          onClick={() => {
            Handlesub(2);
          }}
        >
          Unsubscribe
        </button>
      ) : (
        <button
          className="subscribe"
          onClick={() => {
            Handlesub(1);
          }}
        >
          Subscribe
        </button>
      )}
    </div>
  );
};
