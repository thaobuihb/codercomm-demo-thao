import * as React from "react";
import * as Yup from "yup";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import FTextField from "../../components/form/FTextField.js";
import FormProvider from "../../components/form/FormProvider.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { alpha } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updateComment, selectCommentById } from "./commentSlice.js";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content cannot be empty"),
});

export default function CommentEdit({ postId, commentId }) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch();
  const existingComment = useSelector((state) => selectCommentById(state, commentId));

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      content: existingComment ? existingComment.content : "",
      image: null,
    },
  });

  const { handleSubmit, reset, setValue } = methods;

  const handleClickOpen = () => {
    if (existingComment) {
      setValue("content", existingComment.content);
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await dispatch(
        updateComment({
          postId: postId,
          commentId: commentId,
          content: data.content,
        })
      ).unwrap(); 
      setOpen(false); 
      reset();
    } catch (error) {
      console.error("Comment update failed: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography onClick={handleClickOpen}>Edit</Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
            Please update your comments here
            </DialogContentText>

            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Share your thoughts..."
              sx={{
                "& fieldset": {
                  borderWidth: `1px !important`,
                  borderColor: alpha("#919EAB", 0.32),
                },
                marginTop: "16px",
              }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
            cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "updating..." : "update"}
            </Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}

CommentEdit.propTypes = {
  postId: PropTypes.string.isRequired,
  commentId: PropTypes.string.isRequired,
};
