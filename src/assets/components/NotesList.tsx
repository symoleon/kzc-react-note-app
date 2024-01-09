import ListStyles from './NotesList.module.css';

type Note = {
    title: string,
    content: string,
    date: Date,
}
type Props = {
    notes: Array<Note>,
}

export default function NotesList({ notes }: Props) {
    return (
        <div className={ListStyles.list}>
            <h2>Notes List</h2>
            <div className={ListStyles.notesContainer}>
                {notes.map(note => (
                    <div className={ListStyles.note} key={note.title}>
                        <div className={ListStyles.noteHeader}>
                            <h3>{note.title}</h3>
                            <p className={ListStyles.date}>{note.date.toLocaleDateString()} {note.date.toLocaleTimeString()}</p>
                        </div>
                        <p className={ListStyles.noteContent}>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}