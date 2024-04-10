import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


const Login = (props) => {
  const navigat = useNavigate()
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const URL = "https://inotebook-pfb4.onrender.com/"
    const response = await fetch(`${URL}api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: login.email, password: login.password })

    });
    const json = await response.json()

    if (json.success) {
      // save the auth token and redireact
      localStorage.setItem('token', json.authToken)
   
      navigat('/')
      props.showAlert("Account Create Successfully", "success")
    } else {
   
      props.showAlert("Invalid Details", "danger")
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setLogin({
      ...login,
      [name]: value
    })
  }

  return (
    <div>
      <h2>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={login.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={login.password} onChange={onChange} name='password' />
        </div>

        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Login
