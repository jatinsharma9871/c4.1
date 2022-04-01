// User should be able to add/create new meetups

import axios from "axios";
import { useState } from "react";

export const AddMeetup = () => {
  const [meet, setMeet] = useState({
    title: "",
    location: "",
    date: "",
    time: "",
    theme: "",
    description: "",
    image: "",
  });

  const handleChange = ({ className, value }) => {
    setMeet({ ...meet, [className]: value });
  };

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/meetups", meet)
      .then((res) => {})
      .catch((er) => {});
  };

  return (
    <div className="addMeetupContainer">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <h1>Add Meetup</h1>
        <label>title</label>
        <input
          type="text"
          className="title"
          onChange={(event) => {
            handleChange(event.target);
          }}
          required
        />
        <label>Location</label>
        <select
          value={""}
          className="location"
          onChange={(event) => {
            handleChange(event.target);
          }}
        >
          <option value=""></option>
          <option value="bangalore">Bangalore</option>
          <option value="kolkata">Kolkata</option>
          <option value="delhi">Delhi</option>
          <option value="mumbai">Mumbai</option>
        </select>
        <br />
        <label>date</label>
        <input
          type="text"
          className="date"
          onChange={(event) => {
            handleChange(event.target);
          }}
          placeholder="format YYYY-MM-DD"
          required
        />
        <br />
        <label>time</label>
        <input
          type="text"
          className="time"
          onChange={(event) => {
            handleChange(event.target);
          }}
          placeholder="format HH:MM"
          required
        />
        <br />
        <label>Theme</label>
        <select
          value={meet.theme}
          className="theme"
          onChange={(event) => {
            handleChange(event.target);
          }}
        >
          <option value="">-----------</option>
          <option value="technology">Technology</option>
          <option value="food">Food</option>
          <option value="movies">Movies</option>
          <option value="culture">Culture</option>
          <option value="art">Art</option>
          <option value="drama">Drama</option>
        </select>
        <label>description</label>
        <input
          type="text"
          className="description"
          onChange={(event) => {
            handleChange(event.target);
          }}
          placeholder="Description"
          required
        />
        <br />
        <label>Image</label>
        <input
          type="text"
          className="image"
          onChange={(event) => {
            handleChange(event.target);
          }}
          required
        />
        <br />
        <input className="submitMeetupForm" type="submit" />
      </form>
    </div>
  );
};
