import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  onSubmit: (message: string) => void;
}

const AdminMessageDialog: React.FC<Props> = ({ open, onClose, onSubmit }) => {
  const [message, setMessage] = useState('');

  const handleClose = () => {
    onClose();
    setMessage('');
  };

  const handleSubmit = () => {
    onSubmit(message);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Enter admin message</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter a message for the seller regarding the rejection or improvement required.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Message"
          fullWidth
          value={message}
          onChange={(e:any) => setMessage(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Send Message
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminMessageDialog;