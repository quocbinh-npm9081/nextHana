import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
const AlertDialog: React.FC<{
  open: boolean;
  setOpen: (click: boolean) => void;
  result?: any;
}> = ({ open, setOpen, result }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Bạn đã quay vào ô: "}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {result?.completeOption} {result?.id}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlertDialog;
