import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://personal-bookshelf-server.vercel.app/books')
      .then(response => {
        if (Array.isArray(response.data)) {
          setBookshelf(response.data);
        } else {
          console.error('Data is not an array:', response.data);
          setBookshelf([]);
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setError(err);
        setBookshelf([]);
      });
  }, []);

  if (error) {
    return <div>Error loading bookshelf: {error.message}</div>;
  }

  return (
    <div className="text-center m-6">
      <h1 className="text-2xl font-bold">My Bookshelf</h1>
      <div className="flex flex-wrap justify-center mt-6">
        {bookshelf.map((book, index) => (
          <div key={index} className="border p-4 m-2 w-60 shadow-lg">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookshelfPage;
