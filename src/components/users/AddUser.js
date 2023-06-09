import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
  });

  const { name, username, email, phone, website } = user;
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:3001/users", user);
    navigate("/");
  };

  const advancedSchema = yup.object().shape({
    name: yup
      .string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    username: yup
      .string()
      .min(4, "Must be 4 charecters or more")
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: yup
      .string()
      .email("Enter valid Email")
      .required("Email is required"),
    phone: yup
      .string()
      .min(6, "Number must be at least 6 charaters")
      .required("Number is required"),
    website: yup
      .string()
      .min(6, "Number must be at least 6 charaters")
      .required("Number is required"),
  });

  return (
    <Formik
      initialValues={{
        name: "",
        username: "",
        email: "",
        phone: "",
        website: "",
      }}
      validationSchema={advancedSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formik) => (
        <div className="container">
          <div className="w-75 mx-auto shadow p-5">
            <h2 className="text-center mb-4">Add A User</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Name"
                  name="name"
                  value={name}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Username"
                  name="username"
                  value={username}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter Your E-mail Address"
                  name="email"
                  value={email}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  value={phone}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder="Enter Your Website Name"
                  name="website"
                  value={website}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button className="btn btn-primary btn-block">Add User</button>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddUser;
