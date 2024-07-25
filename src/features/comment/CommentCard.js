import React, { useState } from "react";
import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import { IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import CommentEdit from "./CommentEdit";
import CommentDelete from "./CommentDelete";
import useAuth from "../../hooks/useAuth";

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = useState();
  const areOptionsOpened = Boolean(anchorEl);
  const { user } = useAuth();

  const handleOptionsOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const deleteCommentOption = () => {
    setAnchorEl(null);
  };

  const editCommentOption = () => {
    setAnchorEl(null);
  };
  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Box flexGrow={1}></Box>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
          {user._id === comment.author._id && (
            <IconButton onClick={handleOptionsOpen}>
              <MoreVertIcon sx={{ fontSize: 18, marginBottom: "2px" }} />
            </IconButton>
          )}
          {user._id === comment.author._id && (
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              id={"primary-search-account-menu"}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={areOptionsOpened}
              onClose={handleOptionsClose}
            >
              <MenuItem onClick={editCommentOption}>
                <CommentEdit
                  commentId={comment._id}
                  postId={comment.post}
                />
              </MenuItem>
              <MenuItem onClick={deleteCommentOption}>
                <CommentDelete
                  commentId={comment._id}
                  postId={comment.post}
                />
              </MenuItem>
            </Menu>
          )}
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
