import React from 'react'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Alert from '@mui/material/Alert'
import Button from '@mui/material/Button'

const SubmitBookDialog = props => {
  return (
    <Dialog scroll="paper" open={props.isOpen} maxWidth="md" fullWidth={true}>
      {props.bookErr && <Alert severity="error">{props.bookErr}</Alert>}
      <DialogTitle>Submit Book?</DialogTitle>
      <DialogContent dividers={true} className="d-flex">
        <div style={{ flex: 1 }}>
          <h3>Google Info</h3>
          {props.googleBooksData.map((googleBook, index) => (
            <div key={index} className="d-inline-block">
              <img alt="" src={googleBook.volumeInfo.imageLinks?.thumbnail}/>
              <div>title:{googleBook.volumeInfo.title}</div>
              <div>authors: {googleBook.volumeInfo.authors}</div>
              <div>{googleBook.volumeInfo?.industryIdentifiers?.map((identifier, i) => <div key={`${index}${i}`}>{identifier.type}: {identifier.identifier}</div>)}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          <h3>Your Info</h3>
          {props.bookData.title && <div>title: {props.bookData.title}</div>}
          {props.bookData.subtitle && <div>subtitle: {props.bookData.subtitle}</div>}
          {props.bookData.publisher && <div>publisher: {props.bookData.publisher}</div>}
          {props.bookData.tagline && <div>tagline: {props.bookData.tagline}</div>}
          {props.bookData.isbn13 && <div>isbn13: {props.bookData.isbn13}</div>}
          {props.bookData.isbn10 && <div>isbn10: {props.bookData.isbn10}</div>}
          {props.bookData.language1 && <div>language1: {props.bookData.language1}</div>}
          {props.bookData.language2 && <div>language2: {props.bookData.language2}</div>}
          {props.bookData.originalLanguage1 && <div>originalLanguage2: {props.bookData.originalLanguage1}</div>}
          {props.bookData.originalLanguage2 && <div>originalLanguage2: {props.bookData.originalLanguage2}</div>}
          {props.bookData.century && <div>century: {props.bookData.century}</div>}
          {props.bookData.price && <div>list price: {props.bookData.price}</div>}
          {props.bookData.author1 && <div>author1: {props.bookData.author1}</div>}
          {props.bookData.author2 && <div>author2: {props.bookData.author2}</div>}
          {props.bookData.author3 && <div>author3: {props.bookData.author3}</div>}
          {props.bookData.author4 && <div>author4: {props.bookData.author4}</div>}
          {props.bookData.translator1 && <div>translator1: {props.bookData.translator1}</div>}
          {props.bookData.translator2 && <div>translator2: {props.bookData.translator2}</div>}
          {props.bookData.translator3 && <div>translator3: {props.bookData.translator3}</div>}
          {props.bookData.translator4 && <div>translator4: {props.bookData.translator4}</div>}
          {props.bookData.editor1 && <div>editor1: {props.bookData.editor1}</div>}
          {props.bookData.editor2 && <div>editor2: {props.bookData.editor2}</div>}
          {props.bookData.editor3 && <div>editor3: {props.bookData.editor3}</div>}
          {props.bookData.editor4 && <div>editor4: {props.bookData.editor4}</div>}
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => props.setIsOpen(false)}
          disabled={props.bookLoading}
        >Close</Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={props.submitBook}
          disabled={props.bookLoading}
        >Submit</Button>
      </DialogActions>
    </Dialog>
  );
}

export default SubmitBookDialog;
