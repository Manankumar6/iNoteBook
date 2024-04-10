import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [signup, setSignup] = useState({
    name: "",
    email: '',
    password: "",
    cpassword: ''

  })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password } = signup;
    const URL = "https://inotebook-pfb4.onrender.com/"
    const response = await fetch(`${URL}api/auth/createuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })

    });


    const json = await response.json()
 
    
    if(json.success){
      localStorage.setItem("token", json.authToken)
      navigate('/login')
      props.showAlert("Account Created ","success")

    }else{
      props.showAlert("Some error occurs","danger")
    }
  }
  const onChange = (e) => {
    const { name, value } = e.target
    setSignup({
      ...signup,
      [name]: value
    })
  }




  return (
    <div>
         <h2>Signup to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">User Name</label>
          <input type="text" className="form-control" name='name' id="name" value={signup.user} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" name='email' id="email" value={signup.email} onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name='password' id="password" value={signup.password} onChange={onChange} required minLength={5}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name='cpassword' id="cpassword" value={signup.cpassword} onChange={onChange} required minLength={5}/>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
