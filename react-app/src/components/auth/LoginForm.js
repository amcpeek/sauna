// frontend/src/components/LoginFormModal/LoginForm.js
import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";

function LoginForm({showLogInModal, setShowLogInModal}) {
   // console.log('getting to LoginFormModal/LoginForm', showLogInModal)
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login( email, password ))
     .then( (res) =>{

      if(res) {
        console.log("hopefully can tak out the password part", res)
        const newThing = (res[0].split(':'))
        console.log('new thing', newThing[1])
        if(newThing) {
          const newerThing = newThing[1]
          setErrors([newerThing])
        }

      } else {
        console.log("then are we getting the errors in the data v bc it doesn't see this as an error", res)
      setShowLogInModal(false)
      }
    })
     .catch( async (res) => {
      console.log("is the log in error caught", res)
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);

      })
  };



  const logInDemoUser = (e) => {
    const email = 'annika@aa.io'
    const password = 'passwordAnnika'
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login( email, password ))
    .then((thenRes) => {
      console.log('is the login error then-ed', thenRes)
      setShowLogInModal(false)})
    .catch(
      async (res) => {
        console.log("is the log in error caught", res)
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    )
  }
 //className was LogInForm
  return (
    <div className=" jc-c ai-c all-margin-small">
    <div className="t">
    <div className=''>
    <div className=''>
    <button className="bg-white just-text-button" onClick={() => setShowLogInModal(false)}>X</button>
    <h4>Login</h4>
    <div className='LogInErrors'>
        {errors.map((error, idx) => (
          <div key={idx}>{error}</div>
        ))}
      </div>

    </div>
    </div>
    <form onSubmit={handleSubmit} className="" >


      <div className='b-margin'>
      <label >
        <input
          className='circle thin-bor bg-white'
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      </div>
      <div className='b-margin'>
      <label>
        <input
          className='circle thin-bor bg-white'
          placeholder="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      </div>
      <div className='b-margin'>
        <button className='bg-white thin-bor circle' type="submit">Log In</button>
      </div>
      <div className='b-margin'>
        <button className='bg-white thin-bor circle' onClick={logInDemoUser}>Login as Demo User</button>
      </div>

    </form>
    </div>
    </div>
  );
}

export default LoginForm;
