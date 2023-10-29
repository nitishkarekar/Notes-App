import React, {useEffect, useState, useCallback} from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
// import notes from '../assests/data'
import { ReactComponent as ArrowLeft } from '../assests/arrow-left.svg'

const NotePage = () => {
  let params = useParams()
  const navigate = useNavigate()
  // let note = notes.find(note => note.id === Number(params.noteId))
  let [note, setNote] = useState(null)

  let getNote = useCallback(async () => { 
    if (params.noteId === 'new') return
    let response = await fetch(`http://localhost:3001/notes/${params.noteId}`)
    let data = await response.json()
    setNote(data)
  }, [params.noteId])

  useEffect(() => {
    getNote()
  },[params.noteId, getNote])

  let createNote = async () => {
    await fetch(`http://localhost:3001/notes/`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    }) 
  }

  let updateNote = async () => {
    await fetch(`http://localhost:3001/notes/${params.noteId}`,{
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({...note, 'updated': new Date()})
    }) 
  }

  let deleteNote = async () => {
    await fetch(`http://localhost:3001/notes/${params.noteId}`,{
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    }) 
    navigate('/')
  }

  let handleSubmit = async () => {

    if (params.noteId !== 'new' && !note.body){
      deleteNote()
    }else if(params.noteId !== 'new'){
      updateNote()
    }else if(params.noteId === 'new' && note !== null){
      createNote()
    }
    navigate('/')
  }
  
  return (
    <div className='note'>
      <div className='note-header'>
        <h3>
          <Link to="/">
            <ArrowLeft onClick={handleSubmit} />
          </Link>
        </h3>
        {params.noteId !== 'new' ? (
          <button onClick={deleteNote}>Delete</button>
        ):(
          <button onClick={handleSubmit}>Done</button>
        )}
        


      </div>

      <textarea onChange = {(e)=> {setNote({...note, 'body':e.target.value})} } value={note?.body}>

      </textarea>
    </div>
  )
}

export default NotePage