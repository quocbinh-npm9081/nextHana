import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { useSession } from "next-auth/react";

const AlertDialog: React.FC<{
  open: boolean;
  setOpen: (click: boolean) => void;
  result?: any;
}> = ({ open, setOpen, result }) => {
  const [voucherInfo, setVoucherInfo] = React.useState<any>();
  const handleClose = () => {
    const orderVoucher = async () => {
      const user = data?.user;
      if (user && voucherInfo != null) {
        const voucherOfUser = {
          userName: user.name,
          phoneNumber: user.phoneNumber,
          voucherName: voucherInfo.name,
          voucherContent: voucherInfo.content,
        };
        const response = await fetch("/api/luckyOrderVoucher", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(voucherOfUser),
        });
        const result = await response.json();
        console.log("result add user", result);
      }
    };
    orderVoucher();
    setOpen(false);
  };
  const { data, status } = useSession();

  React.useEffect(() => {
    const addproductSelected = async () => {
      const response = await fetch("/api/luckyVoucherById", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });
      const data = await response.json();
      setVoucherInfo(data.voucher);
    };
    addproductSelected();
  }, [result]);

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
            {voucherInfo ? voucherInfo.name : ""}
          </DialogContentText>
          <DialogContentText id="alert-dialog-description">
            {voucherInfo ? voucherInfo.content : ""}
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
