import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {
  const host = "https://inotebook-pfb4.onrender.com"
  
  const noteintiial = []
  const [notes,setNotes] = useState(noteintiial)
  // Get All Notes
  const getNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      })
      const json = await response.json();
     
      setNotes(json)
    } catch (error) {
      console.error('Error fetching notes:', error);
      // Handle the error, maybe show an alert or perform other actions
    }
  };
  // ADD Note
  const addNote = async (title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });


    const note = await response.json()
    setNotes(notes.concat(note))



  }
  // Delete Note 
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    const json = await response.json();
    console.log(json)
    const newNote = notes.filter((currNote) => { return currNote._id !== id })
    setNotes(newNote)
    
  }
  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();
    console.log(json)
    let newNotes = JSON.parse(JSON.stringify(notes))


    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
        break;

      }

    }

    setNotes(newNotes)
  }
  return (

    <NoteContext.Provider value={{ notes,setNotes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;