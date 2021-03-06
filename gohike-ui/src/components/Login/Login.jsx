/**
 * @fileoverview This file implements the Login Page for users with existing 
 * accounts.
 */
import * as React from "react"
import "./Login.css"
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../Images/Logo.png"

/**
 * Holds form to log in users
 * 
 * @param {function} setCurrUser Sets currUser on login
 * @param {boolean} transparent State var holding state of Navbar background 
 * @param {function} setTransparent Sets the boolean in transparent
 * @returns Login component
 */
export default function Login({ setCurrUser, transparent, setTransparent }) {
    /**
     * URL to make post request to login to app
     * @type {string}
     */
    const LOGIN_URL = "http://localhost:3001/authorization/login"
    /**
     * Holds username input
     * @type {string}
     */
    const [username, setUsername] = React.useState('')
    /**
     * Holds password input
     * @type {string}
     */
    const [password, setPassword] = React.useState('')
    /**
     * Holds error message
     * @type {string}
     */
    const [error, setError] = React.useState("")
    /**
      * Navigation tool
      * @type {hook}
      */
    const history = useNavigate()
    /**
      * Reference to user input
      * @type {hook}
      */
    const userRef = React.useRef()
    /**
      * Reference to error message
      * @type {hook}
      */
    const errorRef = React.useRef();

    // Set focus on user input on every render
    React.useEffect(() => {
      userRef.current.focus();
      if (transparent) {
        setTransparent(false);
      }
    }, [])

    // Empty error message whenver username or password input changes
    React.useEffect(() => {
      setError('')
    }, [username, password])

    /**
     * Handles submit of login form
     * @param {event} event 
     */
    const handleSubmit = async(event) => {
      event.preventDefault();

      // Login user by making post request
      axios.post(LOGIN_URL, {username, password}).then(function(loginUser) {
        setCurrUser({ username: loginUser.data.username, sessionToken: loginUser.data.sessionToken, firstName: loginUser.data.firstName, lastName: loginUser.data.lastName })
        localStorage.setItem("username", loginUser.data.username)
        localStorage.setItem("sessionToken", loginUser.data.sessionToken)
        localStorage.setItem("firstName", loginUser.data.firstName)
        localStorage.setItem("lastName", loginUser.data.lastName)

        // Reset login form
        setUsername('')
        setPassword('')
        history('/')
      }).catch((err) => {
        setError("Invalid Username or Password")
        errorRef.current.focus()
      })
    }

    // Return React component
    return (
      <nav className="login">
        <div className="login-section">
          <img className="login-logo"src={logo} />
          <h1 className="login-header">
            Log in to plan your next hiking adventure and connect with friends.
          </h1>
          {error ? 
            <p 
              ref={errorRef} 
              className="login-error" 
              aria-live="assertive">
              {error}
            </p> : 
            ""}
          <form 
            className="form" 
            onSubmit={handleSubmit}>
              <input
                  className="username-input login-input" 
                  type="text"
                  id="username"
                  ref={userRef}
                  autoComplete="off"
                  onChange={(event) => setUsername(event.target.value)}
                  value={username}
                  placeholder="Username"
                  required
              />

              <input
                  className="password-input login-input"
                  type="password"
                  id="password"
                  autoComplete="off"
                  onChange={(event) => setPassword(event.target.value)}
                  value={password}
                  placeholder="Password"
                  required
              />
              <button className="login-page-button">Log In</button>
          </form>
          <div className="need-account">
              <p>Need an account?</p>
              <Link to='/register'>Register Here</Link>
          </div>
        </div>
      </nav>
    )
  }