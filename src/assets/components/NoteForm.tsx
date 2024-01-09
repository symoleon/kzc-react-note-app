import React from 'react';
import { useRef } from 'react';
import FormStyles from './NoteForm.module.css';

type Note = {
    title: string,
    content: string,
    date: Date,
}
type Props = {
    addNoteHandler: (note: Note) => void,
}

export default function NoteForm({ addNoteHandler }: Props) {

    const titleRef = useRef<HTMLInputElement>(null);
    const contentRef = useRef<HTMLTextAreaElement>(null);

    async function formSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const note: Note = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            date: new Date(),
        }

        const res = await fetch('https://kzc.ora.coobie.dev/', {
            method: 'POST',
            body: JSON.stringify(note)
        });
        if (res.ok) {
            addNoteHandler(note);
            titleRef.current!.value = '';
            contentRef.current!.value = '';
        }

    }

    return (
        <form className={FormStyles.form} onSubmit={formSubmit}>
            <h2>Add a note</h2>
            <input type="text" name="title" placeholder="Title" ref={titleRef}/>
            <textarea className={FormStyles.noteText} name="content" placeholder="Write your note here." ref={contentRef}/>
            <button type="submit">Add note</button>
        </form>
    )
}