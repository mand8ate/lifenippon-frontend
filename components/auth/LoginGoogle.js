import React, { useEffect, useRef } from "react";
import { authenticate, loginWithGoogle, isAuth } from "../../actions/auth";
import { GOOGLE_CLIENT_ID } from "../../config";
import jwt from "jsonwebtoken";
import Router from "next/router";

const LoginGoogle = () => {
  const googleButtonRef = useRef(null);

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  const handleCredentialResponse = (response) => {
    loginWithGoogle(response).then((data) => {
      if (data.error && data.error) {
        console.log(data.error);
      } else {
        authenticate(data, () => {
          if (isAuth() && isAuth().role === 1) {
            Router.push("/admin");
          } else {
            Router.push("/user");
          }
        });
      }
    });
  };

  return (
    <div>
      <h1>Google Sign-In</h1>
      <div className="pb-3">
        <div id="googleButton"></div>
      </div>
    </div>
  );
};

export default LoginGoogle;
