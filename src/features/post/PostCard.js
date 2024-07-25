import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentForm from "../comment/CommentForm";
import CommentList from "../comment/CommentList";
import PostEdit from "./PostEdit";
import PostDelete from "./PostDelete";
import useAuth from "../../hooks/useAuth";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState();
  const areOptionsOpened = Boolean(anchorEl);
  const { user } = useAuth();

  const handleOptionsOpen = (event) => {
    setAnchorEl(event.target);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  const deletePostOption = () => {
    setAnchorEl(null);
  };

  const editPostOption = () => {
    setAnchorEl(null);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          user._id === post.author._id && (
            <IconButton onClick={handleOptionsOpen}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
          )
        }
      />

      {user._id === post.author._id && (
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
          <MenuItem onClick={editPostOption}>
            <PostEdit postId={post._id} />
          </MenuItem>
          <MenuItem onClick={deletePostOption}>
            <PostDelete postId={post._id} />
          </MenuItem>
        </Menu>
      )}

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography>{post.content}</Typography>

        {post.image && (
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              height: 300,
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img src={post.image} alt="post" />
          </Box>
        )}

        <PostReaction post={post} />
        <CommentList postId={post._id} />
        <CommentForm postId={post._id} />
      </Stack>
    </Card>
  );
}

export default PostCard;
