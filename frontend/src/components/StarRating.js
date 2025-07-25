//This helps in the star rating of books
import React from 'react';

const StarRating = ({ rating }) => {
    return (
        <div className="star-rating">
            {[...Array(5)].map((_, index) => {
                const starClass = index < Math.round(rating) ? '★' : '☆';
                return <span key={index}>{starClass}</span>;
            })}
            ({rating.toFixed(1)})
        </div>
    );
};


export default StarRating;