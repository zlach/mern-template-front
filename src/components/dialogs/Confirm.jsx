import React from 'react'
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

const ConfirmDialog = props => {
  return (
    <Dialog scroll="paper" open={props.isOpen} maxWidth={props.maxWidth || 'md'} fullWidth={props.fullWidth || false}>
      {props.err && <Alert severity="error">{props.err}</Alert>}
      <DialogTitle>{props.title}</DialogTitle>
      <DialogContent dividers={true} className="d-flex">
        {props.message}
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => props.setIsOpen(false)}
          disabled={props.isLoading}
        >{props.denyText}</Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={props.handleConfirm}
          disabled={props.isLoading}
        >{props.confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
