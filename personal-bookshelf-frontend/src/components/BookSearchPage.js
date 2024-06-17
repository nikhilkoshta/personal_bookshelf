// src/components/BookSearchPage.js
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import _ from 'lodash';

const BookSearchPage = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const debouncedFetchBooks = useMemo(() => {
    const fetchBooks = async (query) => {
      if (query !== '') {
        const response = await axios.get(`https://openlibrary.org/search.json?q=${query}&limit=10&page=1`);
        setResults(response.data.docs);
      } else {
        setResults([]);
      }
    };
    return _.debounce(fetchBooks, 300);
  }, []); 

  const handleSearch = (e) => {
    setQuery(e.target.value);
    debouncedFetchBooks(e.target.value);
  };

  const addToBookshelf = (book) => {
    axios.post('http://localhost:5000/books/add', {
      title: book.title,
      edition_count: book.edition_count,
    }).then(() => {
      alert('Book added to bookshelf');
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <div className="text-center m-6">
      <h1 className="text-2xl font-bold">Search by book name:</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        className="w-1/2 p-2 mt-4 mb-4 border rounded-lg"
      />
      <a href="/bookshelf" className="inline-block mt-4 mb-8 p-2 bg-green-600 text-white rounded-lg">
        My Bookshelf
      </a>
      <div className="flex flex-wrap justify-center">
        {results.map((book) => (
          <div key={book.key} className="border p-4 m-2 w-60 shadow-lg">
            <p><strong>Book Title:</strong> {book.title}</p>
            <p><strong>Edition Count:</strong> {book.edition_count}</p>
            <button
              onClick={() => addToBookshelf(book)}
              className="mt-2 p-2 bg-green-600 text-white rounded-lg"
            >
              Add to Bookshelf
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookSearchPage;
