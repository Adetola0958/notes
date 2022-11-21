import React, {useState, useContext} from 'react'
import { v4 as uuid } from "uuid";
import { NoteContext } from './useReducer';

const Form = () => {
    const noteContext = useContext(NoteContext)
    const [textNote, setTextNote] = useState("")

    const createNote = (e) => {
        e.preventDefault()
        if(!textNote){
            return;
        }
        const newText = {
            id: uuid(),
            text: textNote,
            rotate: Math.floor(Math.random() * 20)
        }
        noteContext.noteDispatch({type: "ADD_NOTE_SUCCESS", payload: newText})
        setTextNote("")
    }

    // const deleteNote = (e, id)=> {
    //     e.preventDefault()
    //     noteContext.noteDispatch({type: "DELETE_NOTE_SUCCESS", payload: id})
    // }
    
  return (
    <div className='space'>
        {/*This form tag has been creatd to be able to take in text for the notes*/}
        <form onSubmit={createNote} className='form'>
            <textarea 
                value={textNote}
                placeholder='Type in a new note'
                onChange={e => setTextNote(e.target.value)}
            ></textarea>
            <button>Add a note</button>
        </form>
        {
          <div>
            <h1 onMouseEnter={() => noteContext.noteDispatch({type: "DELETE_NOTE_SUCCESS", payload:{id: noteContext.noteState.currentNote}})}>Trash</h1>
          </div>
        }
    </div>
  )
}

export default Form