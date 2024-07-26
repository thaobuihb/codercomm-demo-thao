import * as React from "react";
import * as Yup from "yup";
import { useCallback, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Typography } from "@mui/material";
import FTextField from "../../components/form/FTextField.js";
import FUploadImage from "../../components/form/FUploadImage.js";
import FormProvider from "../../components/form/FormProvider.js";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { alpha } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, selectPostById } from "./postSlice.js"; // Import đúng selector

const yupSchema = Yup.object().shape({
  content: Yup.string().required("Content is required"),
});

export default function PostEdit({ postId }) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const existingPost = useSelector((state) => selectPostById(state, postId));

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues: {
      content: existingPost ? existingPost.content : "",
      image: existingPost ? existingPost.image : null,
    },
  });

  const { handleSubmit, setValue, reset } = methods;

  useEffect(() => {
    if (existingPost) {
      setValue("content", existingPost.content);
      setValue("image", existingPost.image);
    }
  }, [existingPost, setValue]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data) => {
    dispatch(
      updatePost({ postId: postId, content: data.content, image: data.image })
    )
      .then(() => {
        setOpen(false);
        reset();
      })
      .catch((error) => {
        console.error("Cập nhật bài viết thất bại: ", error);
      });
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setValue(
          "image",
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        );
      }
    },
    [setValue]
  );

  return (
    <div>
      <Typography onClick={handleClickOpen}>Edit Post</Typography>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"sm"}
      >
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Edit post</DialogTitle>
          <DialogContent>
            <DialogContentText>Please update your post here.</DialogContentText>

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

            <FUploadImage
              name="image"
              accept="image/*"
              maxSize={3145728}
              onDrop={handleDrop}
              sx={{ marginTop: "16px" }}
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
