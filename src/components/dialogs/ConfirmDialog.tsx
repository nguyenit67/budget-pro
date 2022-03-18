import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { ReactNode } from 'react';

type ConfirmDialogProps = {
  title: ReactNode;
  children: ReactNode;
  open: boolean;
  setOpen: (open: boolean) => unknown;
  onConfirm: () => void;
};

function ConfirmDialog(props: ConfirmDialogProps) {
  const { title, children, open, setOpen, onConfirm } = props;

  const handleClose = () => setOpen(false);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog"
      disableEscapeKeyDown
      // disableBackdropClick
    >
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            onConfirm();
            handleClose();
          }}
          color="primary"
        >
          Yes
        </Button>
        <Button variant="outlined" onClick={handleClose} color="secondary">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ConfirmDialog;
