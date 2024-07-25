import * as React from "react";
import * as Yup from "yup";
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
import { useDispatch } from "react-redux";
import { updateComment } from "./commentSlice.js";

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

const defaultValues = {
  content: "",
  image: null,
};

export default function CommentEdit({ postId, commentId }) {
  const [open, setOpen] = React.useState(false);
  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues,
  });
  const { handleSubmit, reset } = methods;
  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    setOpen(false);
    dispatch(
      updateComment({
        postId: postId,
        commentId: commentId,
        content: data.content,
      })
    );
    reset();
  };

  return (
    <div>
      <Typography onClick={handleClickOpen}>Edit</Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"50vw"}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit comment</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please update your comment here.
            </DialogContentText>

            <FTextField
              name="content"
              multiline
              fullWidth
              rows={4}
              placeholder="Share what you are thinking here..."
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Change</Button>
          </DialogActions>
        </FormProvider>
      </Dialog>
    </div>
  );
}
