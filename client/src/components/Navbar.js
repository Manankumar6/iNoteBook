import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { MdMenu } from "react-icons/md";
import { MdSplitscreen } from "react-icons/md";
import { CiRedo } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { PiDotsNine } from "react-icons/pi";
import { PiDotsThreeCircleLight } from "react-icons/pi";
const Navbar = () => {
    const navigate = useNavigate()

    const logindetails = localStorage.getItem('token')

    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')

    }

    return (
        <div className='container-fluid m-0 p-0'>
            <div className="row  ">
                <div className="col-6 col-md-2 d-flex align-items-center ">

                    <MdMenu className='  ms-2 bg-light   rounded-circle p-2 nav-item-icon' />
                    <img src="/images/logo.png" alt="logo" width="30px" height="50px" className='ms-3 navbar-brand' />
                    <span className="navbar-brand fs-4  " >Keep</span>
                </div>
                <div className="col-6 my-auto d-none d-md-block">

                    <input type="text" placeholder=' Search' className='form-control   p-3  border-0' style={{ background: "#f1f3f4" }} />
                </div>



                <div className="col-6 col-md-4 my-auto   ">
                    <div className="row  me-1 ">

                        <div className="col-7 col-md-9 gap-1  d-flex justify-content-end " >
                            <CiRedo className=' rounded-circle  nav-item-icon' />
                            <MdSplitscreen className=' rounded-circle  nav-item-icon' />
                            <IoSettingsOutline className=' rounded-circle  nav-item-icon' />
                        </div>
                        <div className="col-5 col-md-3 gap-1 d-flex justify-content-end   ">
                            <PiDotsNine className='rounded-circle  nav-item-icon' />
                            <PiDotsThreeCircleLight className='rounded-circle  nav-item-icon' />
                       
                        {/* {!localStorage.getItem('token') ?
                            <form className="d-flex">
                                <NavLink className="btn btn-primary mx-1" to="/login" role="button">Login</NavLink>
                                <NavLink className="btn btn-primary mx-1" to="/signup" role="button">Signup</NavLink>
                            </form>
                            :
                            <button className="btn btn-primary mx-1" onClick={handleLogout} >Logout</button>

                        } */}
                         </div>
                    </div>
                </div>
                <hr className='m-1' />
            </div>
        </div>

    )
}

export default Navbar
