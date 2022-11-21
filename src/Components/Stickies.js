import React, {useEffect, useContext, useState} from "react"
import Form from "./Form";
import { NoteContext } from "./useReducer";

const Stickies = () => {
    const [notes, setNotes] = useState([])
    const noteContext = useContext(NoteContext)

  const dragNote = e => {
    e.stopPropagation()
    e.preventDefault()
  }
  const drag = (e, id) => {
    e.target.style.left = `${e.pageX - 50}px`
    e.target.style.top = `${e.pageY - 50}px`
    noteContext.noteDispatch({type: "CURRENT_NOTE", payload: id})
  }

  {/*Storing all notes in the local storage*/}
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(noteContext.noteState.notes))
  }, [noteContext.noteState])

  {/*Getting all the notes from the local storage */}
  useEffect(() => {
    const notes = JSON.parse(localStorage.getItem("notes"))
    if(notes){
      setNotes(notes)
    }
  }, [])

  return (
    <div className="appbody" onDragOver={dragNote}>
        <Form/>
      {
        noteContext.noteState.notes.map(note => (
          <div className="created-note"
            style={{
              transform: `rotate(${note.rotate}deg)`,
            }}
            draggable= "true"
            onDragEnd= {(e) => drag(e, note.id)}
            key={note.id}
            >
            <pre className="text">{note.text}</pre>
          </div>
        ))
      }
      
    </div>
  );
}

export default Stickies;
