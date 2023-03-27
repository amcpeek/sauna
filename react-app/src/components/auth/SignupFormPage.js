// frontend/src/components/SignupFormPage/index.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";

//THIS IS THE ONE ACTUALLY RUNNING ON THE SITE!!!!!!!!!

function SignupFormPage({ showSignUpModal, setShowSignUpModal }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  //   const [firstName, setFirstName] = useState("")
  //   const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [showLogInModal, setShowLogInModal] = useState(false);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);

      return dispatch(sessionActions.signUp(username, email, password))
        .then((res) => {
          //not ideal solution to this issue, should be throwing an error
          if (res) {
            setErrors(res);
          } else {
            //console.log("then are we getting the errors in the data v bc it doesn't see this as an error", res)
            setShowSignUpModal(false);
          }
        })
        .catch(async (res) => {
          // const data = await res.json();
          //if (data && data.errors) setErrors(data.errors);
          if (res && res.errors) setErrors(res);
        });
    }
    return setErrors(["passwords: Must match"]);
  };

  // const switchToLogIn = (e) => {
  //   e.preventDefault()
  //   // setShowSignUpModal(false)
  //   setShowLogInModal(true)
  // }

  return (
    <div className="jc-st ai-st col all-margin-small lr-margin-small">
      <div className="jc-st col">
        <button
          className="bg-white just-text-button circle"
          onClick={() => setShowSignUpModal(false)}
        >
          X
        </button>
        <h4>Sign Up</h4>
        <div className="">
          <div className="b-margin col">
            {errors.map((error, idx) => (
              <div key={idx}>{error}</div>
            ))}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="C">
        <div className="b-margin">
          <label className="row jc-sb wh-100">
            Username &nbsp;
            <input
              className="circle thin-bor bg-white"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="b-margin">
          <label className="row jc-sb wh-100">
            Email
            <input
              className="circle thin-bor bg-white"
              placeholder="Email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="b-margin">
          <label className="row jc-sb wh-100">
            Password
            <input
              className="circle thin-bor bg-white"
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="b-margin">
          <label className="row jc-sb wh-100">
            Confirm Password &nbsp; &nbsp; &nbsp;
            <input
              className="circle thin-bor bg-white"
              placeholder="Confirm Password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
        </div>

        <div>
          <button className="asana-button" type="submit">
            Sign Up
          </button>
        </div>
        {/* <button className='asana-button' onClick={switchToLogIn}>Log in & Demo User</button> */}
      </form>
    </div>
  );
}

export default SignupFormPage;
