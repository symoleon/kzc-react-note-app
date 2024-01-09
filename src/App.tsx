import { useEffect, useState } from 'react';
import NoteForm from './assets/components/NoteForm';
import NotesList from './assets/components/NotesList';
import './App.css';

type Note = {
  title: string,
  content: string,
  date: Date,
}
type RawNote = {
  title: string,
  content: string,
  date: string,
}

function App() {


  const [notes, setNotes] = useState<Array<Note>>([]);

  function addNote(note: Note) {
    setNotes((prev) => {
      return [note, ...prev];
    })
  }

  useEffect(() => {
    const abortController = new AbortController();
    fetch('https://kzc.ora.coobie.dev/', {
      signal: abortController.signal
    }).then(res => res.json())
      .then(data => {
        const notes: Array<Note> = data.data.map((note: RawNote) => {
          return {
            title: note.title,
            content: note.content,
            date: new Date(note.date),
          }
        });
        notes.reverse();
        setNotes(notes);
      }).catch((err) => {
        if (err.name === 'AbortError') {
          return;
        }
      });
    return () => {
      abortController.abort();
    }
  }, []);

  return (
    <>
      <NoteForm addNoteHandler={addNote}/>
      <NotesList notes={notes} />
    </>
  )
}

export default App
