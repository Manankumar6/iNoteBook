import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [note,setNote] = useState({
        title:"",
        description:"",
        tag:"Default"
    })
    const handleClick =(e)=>{
        e.preventDefault()
        addNote(note.title,note.description,note.tag)
        setNote({
          title:"",
          description:"",
          tag:""
      })
      props.showAlert("Added Successfullt","success")
    }

    const onChange =(e)=>{
        const {name,value} = e.target
        setNote({...note,[name]:value})
    }



  return (
    <div className='container'>
       <h1>Add A Note</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={onChange}   minLength={5} required value={note.title} />
          <div id="description" className="form-text">Description</div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Description</label>
          <input type="text" className="form-control" id="description" name='description' onChange={onChange}   minLength={5} required value={note.description} />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name='tag' onChange={onChange}  minLength={5} required  value={note.tag} />
        </div>
        
        <button disabled={note.title.length <5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
      </form>
    </div>
  )
}

export default Addnote
