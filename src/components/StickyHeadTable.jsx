import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getBooksAction } from '../store/book/bookActions'

const columns = [
  { id: 'title', label: 'Title', minWidth: 200, align: 'left' },
  { id: 'isbn13', label: 'ISBN-13', minWidth: 200, align: 'left' },
  { id: 'authors', label: 'Authors', minWidth: 200, align: 'left' },
];

const StickyHeadTable = props => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const { books } = useSelector(state => state.book)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBooksAction())
  }, [dispatch])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  return (
    <Paper className="w-100 mb-5" sx={{ overflow: 'hidden', bgcolor: 'secondary.main' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ bgcolor: 'secondary.main' }}
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <strong>{column.label}</strong>
                </TableCell>
              ))}
              <TableCell sx={{ bgcolor: 'secondary.main' }} />
            </TableRow>
          </TableHead>
          <TableBody>
            {[...books]
              .reverse()
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover key={row._id}>
                    {columns.map((column) => {
                      let value = row[column.id];

                      if (Array.isArray(value)) {
                        value = value.join(', ')
                      }
                      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value || 'N/A'}
                        </TableCell>
                      );
                    })}
                    <TableCell>
                      <IconButton onClick={() => props.handleDelete(row)} className="text-danger" aria-label="delete book" component="span">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={books.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default StickyHeadTable
