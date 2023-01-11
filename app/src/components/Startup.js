import { useEffect, useState } from 'react';
import uuid from 'react-uuid';
import '../App.css';
import Main from '../components/Main';
import Sidebar from '../components/Sidebar';
import secureLocalStorage from 'react-secure-storage';

function Startup({signOutUser}) {
  // Store list of notes in Startup.js so all its children components (main, sidebar) can access it via props
  // Utilize local storage to store our state containing our notes in local storage -> state wont get cleared when refreshing
  // If there's nothing in local storage we will setNotes to [], else we will set it to the array in local storage
  const [notes, setNotes] = useState(JSON.parse(secureLocalStorage.getItem("notes")) || [])
  // const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || [])
  const [activeNote, setActiveNote] = useState(false)

  // UseEffect hook used to stringify our notes array to be stored. Set our note into local storage, key is "notes" value is [notes]
  // Lets us perform side effects in this component -> data set/fetch is an example
  useEffect(() => {
    secureLocalStorage.setItem("notes", JSON.stringify(notes)) 
  }, [notes])

  // useEffect(() => {
  //   localStorage.setItem("notes", JSON.stringify(notes)) 
  // }, [notes])

  // Add a new note to our array -> generate properties for the note
  const onAddNote = () => {
    const newNote = {
      id: uuid(),        // create a random id for our notes. Uses external lib. to reduce collisions 
      title: "Untitled Note", 
      body: "",
      lastModified: Date.now()
    }
    setNotes([newNote, ...notes])
  }

  // Search for the note we are trying to delete
  const onDeleteNote = (id) => {
    const newNotes = notes.filter((note) => (note.id != id))
    setNotes(newNotes) 
  }

  // When a note is clicked on, it is active, this will need to be previewed 
  const getActiveNote = () => {
    return (
      notes.find((note)=>(note.id===activeNote))
    )
  }

  // Edit the fields of an existing note
  const onUpdateNote = (updateNote) => {
    const newNotes = notes.map((note)=>{
      if (note.id === activeNote) {
        return updateNote
      }
      return note 
    })
    setNotes(newNotes)
  }

  // Call components, pass props
  return (
    <div className="App">
      <Sidebar 
        signOutUser = {signOutUser}
        notes={notes} 
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        activeNote={activeNote}
        setActiveNote={setActiveNote}
      /> 
      <Main 
        activeNote={getActiveNote()}
        onUpdateNote={onUpdateNote}
      /> 
    </div>
  );
}

export default Startup;