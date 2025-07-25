import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import AddBookPage from './pages/AddBookPage';
import AuthPage from './pages/AuthPage';

// A protected route component
const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/auth" />;
};

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<BookListPage />} />
                <Route path="/books/:id" element={<BookDetailPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route
                    path="/add"
                    element={
                        <PrivateRoute>
                            <AddBookPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;