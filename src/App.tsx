import { useEffect, useState } from 'react';
import NoteForm from './assets/components/NoteForm';
import NotesList from './assets/components/NotesList';
import './App.css';

type Note = {
  title: string,
  content: string,
  createdAt: Date,
}
type RawNote = {
  title: string,
  content: string,
  createdAt: string,
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
    fetch('https://65a9763e219bfa3718694979.mockapi.io/api/notes', {
      signal: abortController.signal
    }).then(res => res.json())
      .then(data => {
        const notes: Array<Note> = data.map((note: RawNote) => {
          return {
            title: note.title,
            content: note.content,
            createdAt: new Date(note.createdAt),
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
