import React from 'react'
import ReactMarkdown from 'react-markdown'

function Main({activeNote, onUpdateNote}) {
  const onEditField = (key, value) => {
    onUpdateNote({
        ...activeNote,              // spread out the keys and leave them unchanged if they are not to be changed
        [key]: value,               // key is "title" or "body" , leave the other one unchanged
        lastModified: Date.now()
    })
  }

  if (!activeNote) {
    return(<div className = 'no-active-note'>No note selected</div>)
  }

  return (
    <div className='app-main'>
        {/* Markup for the upper portion that shows the note contents where you can write */}
        <div className='app-main-note-edit'>
            <input type='text' id='title' value={activeNote.title} onChange = {(e) => onEditField("title", e.target.value)} autoFocus />
            <textarea id='body' placeholder='Write your note here' value = {activeNote.body} onChange = {(e) => onEditField("body", e.target.value)}/>
        </div>

        {/* Markup for the lower portion that shows a preview of the note */}
        <div className='app-main-note-preview'>
            <h1 className='preview-title'>{activeNote.title}</h1>
            <ReactMarkdown className='markdown-preview'>{activeNote.body}</ReactMarkdown>
        </div>
    </div>
  )
}

export default Main