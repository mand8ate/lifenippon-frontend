import React, { useState } from "react";
import Layout from "../../../../components/Layout";
import { withRouter } from "next/router";
import { resetPassword } from "../../../../actions/auth";

const ResetPassword = ({ router }) => {
  const [values, setValues] = useState({
    name: "",
    newPassword: "",
    error: "",
    message: "",
    showForm: true,
  });

  const [submitting, setSubmitting] = useState(false);

  const { name, newPassword, error, message, showForm } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    resetPassword({ newPassword, resetPasswordLink: router.query.id }).then(
      (data) => {
        setSubmitting(false);

        if (data.error) {
          setValues({
            ...values,
            error: data.error,
            showForm: false,
            newPassword: "",
          });
        } else {
          setValues({
            ...values,
            message: data.message,
            showForm: false,
            newPassword: "",
            error: false,
          });
        }
      }
    );
  };

  const showError = () =>
    error ? <div className="alert alert-danger">{error}</div> : "";

  const showMessage = () =>
    message ? <div className="alert alert-success">{message}</div> : "";

  const passwordResetForm = () => (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group pt-5">
          <input
            type="password"
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            className="form-control"
            value={newPassword}
            placeholder="Type your new Password"
            required
          />
        </div>
        <div>
          <button className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Change password"}
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <Layout>
      <div className="container-fluid">
        <h2>Reset password</h2>
        <hr />
        {showError()}
        {showMessage()}
        {showForm && passwordResetForm()}
      </div>
    </Layout>
  );
};

export default withRouter(ResetPassword);
