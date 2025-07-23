const express = require('express');
const db = require('../database');
const authMiddleware = require('../authMiddleware');
const router = express.Router();

// Get all books with filtering and average rating
router.get('/', (req, res) => {
    const { author, genre } = req.query;
    let sql = `
        SELECT b.*, COALESCE(AVG(r.rating), 0) as average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
    `;
    const params = [];

    if (author || genre) {
        sql += " WHERE ";
        const conditions = [];
        if (author) {
            conditions.push("b.author LIKE ?");
            params.push(`%${author}%`);
        }
        if (genre) {
            conditions.push("b.genre LIKE ?");
            params.push(`%${genre}%`);
        }
        sql += conditions.join(" AND ");
    }
    
    sql += " GROUP BY b.id";

    db.all(sql, params, (err, rows) => {
        if (err) {
            return res.status(500).json({ message: "Database error." });
        }
        res.json(rows);
    });
});

// Get a single book with its reviews
router.get('/:id', (req, res) => {
    const bookSql = `
        SELECT b.*, COALESCE(AVG(r.rating), 0) as average_rating
        FROM books b
        LEFT JOIN reviews r ON b.id = r.book_id
        WHERE b.id = ?
        GROUP BY b.id
    `;
    const reviewsSql = `SELECT r.*, u.username FROM reviews r JOIN users u ON r.user_id = u.id WHERE r.book_id = ?`;

    db.get(bookSql, [req.params.id], (err, book) => {
        if (err || !book) {
            return res.status(404).json({ message: "Book not found." });
        }
        db.all(reviewsSql, [req.params.id], (err, reviews) => {
            if (err) {
                return res.status(500).json({ message: "Database error." });
            }
            res.json({ ...book, reviews });
        });
    });
});

// Add a new book (protected)
router.post('/', authMiddleware, (req, res) => {
    const { title, author, genre } = req.body;
    if (!title || !author || !genre) {
        return res.status(400).json({ message: "Title, author, and genre are required." });
    }
    const sql = `INSERT INTO books (title, author, genre) VALUES (?, ?, ?)`;
    db.run(sql, [title, author, genre], function(err) {
        if (err) {
            return res.status(500).json({ message: "Failed to add book." });
        }
        res.status(201).json({ id: this.lastID, title, author, genre });
    });
});

// Add a review for a book (protected)
router.post('/:id/reviews', authMiddleware, (req, res) => {
    const { review_text, rating } = req.body;
    if (!review_text || !rating || rating < 1 || rating > 5) {
        return res.status(400).json({ message: "Review text and a rating (1-5) are required." });
    }
    const sql = `INSERT INTO reviews (book_id, user_id, review_text, rating) VALUES (?, ?, ?, ?)`;
    db.run(sql, [req.params.id, req.user.id, review_text, rating], function(err) {
        if (err) {
            return res.status(500).json({ message: "Failed to add review." });
        }
        res.status(201).json({ message: "Review added successfully." });
    });
});

module.exports = router;