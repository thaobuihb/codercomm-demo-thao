import * as React from "react";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";
import { deleteComment } from "./commentSlice";

export default function CommentDelete({ postId, commentId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleDisagree = () => {
    setOpen(false);
  };

  const handleAgree = () => {
    dispatch(deleteComment({ commentId: commentId, postId: postId }));
    setOpen(false);
  };

  return (
    <div>
      <Typography onClick={handleClickOpen}>Delete</Typography>
      <Dialog
        open={open}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete the post?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            The deleted comment cannot be recovered. Proceed?
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
