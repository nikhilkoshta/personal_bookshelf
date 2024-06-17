// src/components/BookshelfPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookshelfPage = () => {
  const [bookshelf, setBookshelf] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/books')
      .then(response => {
        setBookshelf(response.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

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
