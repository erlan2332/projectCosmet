// src/App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = () => {
        axios.get('/api/notes')
            .then(response => {
                setNotes(response.data);
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
            });
    };

    const addNote = () => {
        axios.post('/api/notes', { text: newNote })
            .then(response => {
                setNotes([...notes, response.data]);
                setNewNote('');
            })
            .catch(error => {
                console.error('Error adding note:', error);
            });
    };

    const deleteNote = (id) => {
        axios.delete(`/api/notes/${id}`)
            .then(() => {
                setNotes(notes.filter(note => note.id !== id));
            })
            .catch(error => {
                console.error('Error deleting note:', error);
            });
    };

    return (
        <div>
            <h1>Notes App</h1>
            <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
            />
            <button onClick={addNote}>Add Note</button>
            <ul>
                {notes.map(note => (
                    <li key={note.id}>
                        {note.text}
                        <button onClick={() => deleteNote(note.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
