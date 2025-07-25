//book list page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBooks } from '../services/api';
import StarRating from '../components/StarRating';

const BookListPage = () => {
    const [books, setBooks] = useState([]);
    const [authorFilter, setAuthorFilter] = useState('');
    const [genreFilter, setGenreFilter] = useState('');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const params = {};
                if (authorFilter) params.author = authorFilter;
                if (genreFilter) params.genre = genreFilter;
                const { data } = await getBooks(params);
                setBooks(data);
            } catch (error) {
                console.error("Failed to fetch books:", error);
            }
        };
        fetchBooks();
    }, [authorFilter, genreFilter]);

    return (
        <div className="container">
            <h1>All Books</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by author..."
                    value={authorFilter}
                    onChange={(e) => setAuthorFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by genre..."
                    value={genreFilter}
                    onChange={(e) => setGenreFilter(e.target.value)}
                />
            </div>
            <div className="book-list">
                {books.map(book => (
                    <Link to={`/books/${book.id}`} key={book.id} className="book-card">
                        <h3>{book.title}</h3>
                        <p>by {book.author}</p>
                        <p>Genre: {book.genre}</p>
                        <StarRating rating={book.average_rating} />
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default BookListPage;