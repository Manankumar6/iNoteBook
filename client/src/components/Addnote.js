import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = (props) => {
  const context = useContext(noteContext)
  const [showInputs, setShowInputs] = useState(false);
  const { addNote } = context
  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "Default"
  })
  const handleClick = (e) => {
    e.preventDefault()
    addNote(note.title, note.description, note.tag)
    setNote({
      title: "",
      description: "",
      tag: "Default"
    })
    props.showAlert("Added Successfullt", "success")
  }

  const onChange = (e) => {
    const { name, value } = e.target
    setNote({ ...note, [name]: value })
  }

  const showInput = () => {
    setShowInputs(true); // Update setShowInputs instead of setShowInt
  };
  return (
    <div className='container'>
      {/* <h1 className='text-center'>Add Your Note Privately</h1> */}
      <form >
        <div className="container py-2 mt-3">
          <div className='input_holder p-1 mx-auto rounded-1'>

            <input type="text" placeholder='Take a note...' className='border border-0 my-1 py-2  form-control  ' id='title' name='title' onChange={onChange} minLength={5} required value={note.title} onClick={showInput} />
   
            {
              showInputs &&
           
              <>
                <input type="text" placeholder='description' className='border border-0 my-1 py-2  form-control' id="description" name='description' onChange={onChange} minLength={5} required value={note.description} />
                <input type="text" className="border border-0 my-1 py-2 form-control" id="tag" name='tag' onChange={onChange} minLength={5} required placeholder='tag' value={note.tag} />
              </>
              }
              </div>
            <div className="mx-sm-auto w-50 my-2">

              <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary mx-auto" onClick={handleClick}>Add Note</button>
            </div>
        
    
       
        </div>
      </form>
      {/* <form>
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
      </form> */}
    </div>
  )
}

export default Addnote
