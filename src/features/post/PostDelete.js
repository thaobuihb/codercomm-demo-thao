import * as React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";

export default function PostDelete({ postId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(deletePost({ postId: postId }));
    setOpen(false);
  };

  return (
    <div>
      <Typography onClick={handleClickOpen}>Delete Post</Typography>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The deleted post cannot be recovered. Proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
          <Button onClick={handleDisagree}>Disagree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
