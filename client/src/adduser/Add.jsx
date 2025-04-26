import React, { useState } from "react";
import "./add.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Add = () => {
  const initialUser = {
    name: "",
    email: "",
    address: "",
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/user", user);
      toast.success(response.data.message, { position: "top-right" });
      navigate("/");
    } catch (error) {
      console.log("Error while submitting form:", error);
      toast.error("Something went wrong", { position: "top-right" });
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="name"
            name="name"
            value={user.name}
            autoComplete="off"
            placeholder="Enter your Name"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            onChange={inputHandler}
            id="email"
            name="email"
            value={user.email}
            autoComplete="off"
            placeholder="Enter your Email"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            onChange={inputHandler}
            id="address"
            name="address"
            value={user.address}
            autoComplete="off"
            placeholder="Enter your Address"
            required
          />
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary mt-4 p-2">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;
