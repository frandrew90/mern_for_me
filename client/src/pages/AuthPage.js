import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useHttp } from "../hooks/httpHook";
import { useMessage } from "../hooks/messageHook";

const AuthPage = () => {
  const auth = useContext(AuthContext);
  const { loading, request, error, clearError } = useHttp();
  const [form, setForm] = useState({ email: "", password: "" });
  const message = useMessage();

  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      // console.log("====================================");
      // console.log("data", data);
      // console.log("====================================");

      message(data.message);
    } catch (e) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      // console.log("====================================");
      // console.log("data", data);
      // console.log("====================================");

      auth.login(data.token, data.userId);

      message(data.message);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Make your link</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Authorization</span>

            <div>
              <div className="input-field">
                <input
                  //   placeholder="email"
                  id="email"
                  type="text"
                  name="email"
                  className="yellowInput"
                  onChange={changeHandler}
                />
                <label htmlFor="email">Email</label>
              </div>

              <div className="input-field">
                <input
                  //   placeholder="email"
                  id="password"
                  type="password"
                  name="password"
                  className="yellowInput"
                  onChange={changeHandler}
                />
                <label htmlFor="password">Password</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Sign-In
            </button>
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Registration
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
