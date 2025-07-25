//Book detail page
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById, addReview } from '../services/api';
import StarRating from '../components/StarRating';

const BookDetailPage = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState(0);
    const [error, setError] = useState('');
    const token = localStorage.getItem('token');

    const fetchBook = async () => {
        try {
            const { data } = await getBookById(id);
            setBook(data);
        } catch (error) {
            console.error("Failed to fetch book details:", error);
        }
    };

    useEffect(() => {
        fetchBook();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setError('');
        if (!reviewText || rating === 0) {
            setError("Please provide review text and a rating.");
            return;
        }
        try {
            await addReview(id, { review_text: reviewText, rating });
            setReviewText('');
            setRating(0);
            fetchBook(); // Refresh book details to show new review
        } catch (err) {
            setError(err.response?.data?.message || "Failed to submit review.");
        }
    };

    if (!book) return <div>Loading...</div>;

    return (
        <div className="container">
            <div className="book-detail">
                <h1>{book.title}</h1>
                <h2>by {book.author}</h2>
                <p><strong>Genre:</strong> {book.genre}</p>
                <StarRating rating={book.average_rating} />
            </div>

            <div className="review-section">
                <h3>Reviews</h3>
                {book.reviews.length > 0 ? (
                    book.reviews.map(review => (
                        <div key={review.id} className="review-card">
                            <strong>{review.username}</strong>
                            <StarRating rating={review.rating} />
                            <p>{review.review_text}</p>
                        </div>
                    ))
                ) : (
                    <p>No reviews yet.</p>
                )}
            </div>
            
            {token && (
                <form onSubmit={handleReviewSubmit} className="form-container" style={{maxWidth: '100%', marginTop: '2rem'}}>
                    <h3>Write a Review</h3>
                    <div className="form-group">
                        <label>Rating</label>
                        <select value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value="0" disabled>Select a rating</option>
                            <option value="1">1 Star</option>
                            <option value="2">2 Stars</option>
                            <option value="3">3 Stars</option>
                            <option value="4">4 Stars</option>
                            <option value="5">5 Stars</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Review</label>
                        <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows="4" style={{width: '100%', padding: '0.5rem'}}></textarea>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit">Submit Review</button>
                </form>
            )}
        </div>
    );
};

export default BookDetailPage;