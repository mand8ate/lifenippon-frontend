import React, { useState, useEffect } from "react";
import { isAuth, preSignup } from "../../actions/auth";
import Router from "next/router";

const SignupComponent = () => {
  const [values, setValues] = useState({
    name: "malte",
    email: "malte@gmail.com",
    password: "111111",
    error: "",
    loading: false,
    message: "",
    showForm: true,
  });

  const [submitting, setSubmitting] = useState(false);

  const { name, email, password, error, loading, message, showForm } = values;

  useEffect(() => {
    if (isAuth()) {
      Router.replace("/");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    // console.table({ name, email, password, error, loading, message, showForm });
    setValues({ ...values, loading: true, error: false });
    const user = { name, email, password };

    preSignup(user).then((data) => {
      setSubmitting(false);
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          name: "",
          email: "",
          password: "",
          error: "",
          loading: false,
          message: data.message,
          showForm: false,
        });
      }
    });
  };

  const handleChange = (name) => (e) => {
    setValues({ ...values, error: false, [name]: e.target.value });
  };

  const showLoading = () =>
    loading ? <div className="alert alert-info">Loading...</div> : "";
  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";
  const showMessage = () =>
    message ? <div className="alert alert-info">{message}</div> : "";

  const signupForm = () => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange("name")}
            type="text"
            className="form-control"
            placeholder="Type your name"
            value={name}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("email")}
            type="email"
            className="form-control"
            placeholder="Type your email"
            value={email}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange("password")}
            type="password"
            className="form-control"
            placeholder="Type your password"
            value={password}
          />
        </div>
        <button className="btn btn-primary">
          {submitting ? "Signing up..." : "Signup"}
        </button>
      </form>
    );
  };

  return (
    <React.Fragment>
      {showError()}
      {showLoading()}
      {showMessage()}
      {showForm && signupForm()}
    </React.Fragment>
  );
};

export default SignupComponent;
