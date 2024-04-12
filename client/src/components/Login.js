import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from './Loading'


const Login = (props) => {
  const navigat = useNavigate()
  const [loading,setLoading] = useState(false)
  const [login, setLogin] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e) => {
    setLoading(true)
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
    console.log(json,"login json")

    if (json.success) {
      setLoading(false)
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
    <>
    
    {
      loading ? <Loading/> :
    <div className='container py-2  rounded-1'>
      <h2 className='text-center'  style={{color:"#fbbc04"}}>Login To Continue To iNoteBook</h2>
      <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col  my-auto">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={login.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={login.password} onChange={onChange} name='password' />
        </div>

        <button type="submit" className="btn btn-warning" >Submit</button>
        </div>
        <div className="col">
          <img src="/images/login.gif" className='img-fluid' alt="login" />
        </div>
        </div>
      </form>
    </div>
  }
    </>
  )
}

export default Login
