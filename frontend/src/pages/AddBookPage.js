//Add Book
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../services/api';

const AddBookPage = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [genre, setGenre] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!title || !author || !genre) {
            setError("All fields are required.");
            return;
        }
        try {
            await addBook({ title, author, genre });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add book.");
        }
    };

    return (
        <div className="form-container">
            <h2>Add a New Book</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)} />
                </div>
                {error && <p className="error-message">{error}</p>}
                <button type="submit">Add Book</button>
            </form>
        </div>
    );
};

export default AddBookPage;