import React from 'react'
import Notes from './Notes'
import { FaRegLightbulb } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";
import { RiInboxArchiveLine } from "react-icons/ri";
import { FaRegTrashAlt } from "react-icons/fa";


const Home = (props) => {

  const { showAlert } = props
  return (
    <div className=' d-flex'>
      <div className=" sidebar  " >
        <ul className='m-0 px-2 ' >
          <li ><FaRegLightbulb className='li-icon'/><span> Notes</span></li> 
          <li><FaRegBell className='li-icon'/>  <span> Reminders</span></li>
          <li><CiEdit className='li-icon'/> <span> Edit labels</span> </li>
          <li><RiInboxArchiveLine className='li-icon'/> <span> Archive</span> </li>
          <li><FaRegTrashAlt className='li-icon'/> <span> Trash</span> </li>
        </ul>
      </div>



      <div className="w-75">

        <Notes showAlert={showAlert} />
      </div>
    </div>
  )
}

export default Home
