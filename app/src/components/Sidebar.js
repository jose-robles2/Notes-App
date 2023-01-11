import React from 'react'

function Sidebar({signOutUser, notes,  onAddNote, onDeleteNote, activeNote, setActiveNote }) {
  const sortedNotes = notes.sort((a,b)=> (b.lastModified-a.lastModified)) 
  return (
    <div className='app-sidebar'>
        <div className='app-sidebar-header'>
            <h1>Notes</h1>
            <button onClick={() => signOutUser()}>Sign Out</button>
            <button onClick={onAddNote}>Add</button>
        </div>
        <div className='app-sidebar-notes'>

            {/* Markup for displaying each note in our state array  */}
            {sortedNotes.map((note) => (
                <div className= {`app-sidebar-note ${note.id === activeNote && "active"}`} onClick={() => setActiveNote(note.id)}>
                    <div className='sidebar-note-title'>
                        <strong>{note.title}</strong>
                        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
                    </div>

                    {/* Only preview the first 100 chars */}
                    <p>{note.body && note.body.substr(0, 100) + "..."}</p>
                    <small className='note-meta'>
                        {/* Display real time for lastModified */}
                        Last modified {" "} 
                        {   new Date(note.lastModified).toLocaleDateString("en-us", {
                            hour: '2-digit',
                            minute:"2-digit"
                        })}
                    </small>
                </div> 
            ))}
        </div>
    </div>
  )
}

export default Sidebar