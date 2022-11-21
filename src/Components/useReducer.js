import React, {useReducer} from "react";
import Stickies from "./Stickies";

export const NoteContext = React.createContext()//  A context is created

const initialState = {
    lastNote: null,
    total: 0,
    notes: [],
    currentNote: null,
}
  
  {/*This is the reducer function*/}
const reducer = (state, action) => {
    switch(action.type){
        case "ADD_NOTE_SUCCESS":
            return{lastNote: new Date().toTimeString().slice(0, 8), 
                total: state.notes.length + 1, 
                notes: [...state.notes, action.payload]
            }
        case "DELETE_NOTE_SUCCESS":
            return{
                ...state, 
                total: state.notes.length - 1,
                notes: state.notes.filter(note => note.id !== action.payload.id)
            }
        case "CURRENT_NOTE":
            return{
                ...state,
                currentNote: action.payload
            }
        default:
            return state
    }
}

const Sticker = () => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <>
            {/*The context has provided a value that can be consumed by other components*/}
            <NoteContext.Provider
                value={{noteState: state, noteDispatch: dispatch}}
            >
                <Stickies/>
            </NoteContext.Provider>
        </>
    )
}

export default Sticker