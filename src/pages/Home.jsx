// import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import isEmpty from 'lodash/isEmpty'
// import '../styles/pages/home.css'
// import Box from '@mui/material/Box'
// import SubmitBookDialog from '../components/dialogs/SubmitBook'
// import ConfirmDialog from '../components/dialogs/Confirm'
// import AddIcon from '@mui/icons-material/Add'
// import Container from '@mui/material/Container'
// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// import StickyHeadTable from '../components/StickyHeadTable'
// import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material'
// import AddEditBookForm from '../components/forms/AddEditBookForm'
// import { getGoogleBooksAction } from '../store/google-books/googleBooksActions'
// import { createBookAction, deleteBookAction } from '../store/book/bookActions'
// import LinearProgress from '@mui/material/LinearProgress';
// import { formatBookData } from '../utils/formatting'
// import { useUpdate } from '../utils/hooks'

// const Home = () => {
//   const [submitOpen, setSubmitOpen] = useState(false)
//   const [deleteOpen, setDeleteOpen] = useState(false)
//   const [deleteItem, setDeleteItem] = useState({})
//   const [bookData, setBookData] = useState({})
//   const [alertMsg, setAlertMsg] = useState('')
//   const { isLoading: googleBooksLoading, googleBooks } = useSelector(state => state.googleBooks)
//   const { isLoading: bookLoading, bookErr, book, books } = useSelector(state => state.book)
//   const dispatch = useDispatch()

//   useUpdate(() => {
//     setSubmitOpen(false)
//     setAlertMsg('Book Successfully Added!')
//   }, [book])

//   useUpdate(() => {
//     if (deleteOpen) {
//       setDeleteItem({})
//       setDeleteOpen(false)
//       setAlertMsg('Book Successfully Deleted!')
//     }
//   }, [books])

//   const lookupBook = data => {
//     setBookData(data)

//     dispatch(getGoogleBooksAction({
//       isbn13: data.isbn13
//     }))

//     setSubmitOpen(true)
//   }

//   const submitBook = () => {
//     const formatted = formatBookData(bookData)

//     dispatch(createBookAction(formatted))
//   }

//   const handleDelete = item => {
//     setDeleteItem(item)
//     setDeleteOpen(true)
//   }

//   const confirmDelete = () => dispatch(deleteBookAction({ _id: deleteItem._id }))

//   return (
//     <Container>
//       {googleBooksLoading && <LinearProgress />}
//       <Snackbar open={!isEmpty(alertMsg)} autoHideDuration={4000} onClose={() => setAlertMsg('')}>
//         <MuiAlert elevation={6} variant="filled" onClose={() => setAlertMsg('')} severity="success" sx={{ width: '100%' }}>
//           {alertMsg}
//         </MuiAlert>
//       </Snackbar>
//       <Box sx={{ my: 2 }}>
//         <Accordion sx={{ bgcolor: 'secondary.main', borderRadius: '4px' }} >
//           <AccordionSummary
//             expandIcon={<AddIcon />}
//             aria-controls="accordion-content"
//             id="accordion-header"
//           >
//             <strong>Add</strong>
//           </AccordionSummary>
//           <AccordionDetails>
//             <AddEditBookForm submitBook={lookupBook} />
//           </AccordionDetails>
//         </Accordion>
//       </Box>
//       <StickyHeadTable handleDelete={handleDelete} />
//       <SubmitBookDialog
//         isOpen={submitOpen}
//         setIsOpen={setSubmitOpen}
//         bookData={bookData}
//         googleBooksData={googleBooks}
//         submitBook={submitBook}
//         bookLoading={bookLoading}
//         bookErr={bookErr}
//       />
//       <ConfirmDialog
//         isOpen={deleteOpen}
//         setIsOpen={setDeleteOpen}
//         message={deleteItem.title}
//         err={bookErr}
//         title={'Delete Book?'}
//         isLoading={bookLoading}
//         denyText={'No'}
//         confirmText={'Yes, Delete'}
//         handleConfirm={confirmDelete}
//       />
//       {/* <div style={{outline: '2px solid #87ceeb', marginBottom: '10px', border: '10px solid #161618', borderRadius: '5px', width: '400px', height: '300px', backgroundColor: 'white'}}>

//       </div> */}
//     </Container>
//   );
// }

// export default Home;
