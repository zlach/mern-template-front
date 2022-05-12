import React, { useState } from 'react';
import axios from 'axios';
import '../styles/components/row.css';

const Row = props => {
  const { book } = props;
  const [title, setTitle] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const isbn13 = book.volumeInfo.industryIdentifiers.find(i => i.type === 'ISBN_13').identifier;
      const res = await axios.post('/books', {
        title,
        isbn13
      });
      console.log(res);
    } catch (err) {
      console.log(err) // todo
    }   
  }

  const handleChange = (e) => {
    setTitle(e.target.value);
  }

  return (
    <div className='row'>
      <div className='left'>
        <img alt="" src={book.volumeInfo.imageLinks?.thumbnail}/>
        <div>title:{book.volumeInfo.title}</div>
        <div>authors: {book.volumeInfo.authors}</div>
        <div>{book.volumeInfo?.industryIdentifiers?.map((i, index) => <div key={index}>{i.type}: {i.identifier}</div>)}</div>
      </div>
      <div className='right'>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input type="text" value={title} onChange={handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    </div>
  );
}

export default Row;