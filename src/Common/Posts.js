import React, { useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Loader } from "./Loader";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import EditIcon from "@material-ui/icons/Edit";
import DeleteRoundedIcon from "@material-ui/icons/DeleteRounded";
import "./posts.css";
import {
  AllPostContext,
  DeletePostContext,
  DislikePostContext,
  LikePostContext,
  LoadingContext,
  SearchValueContext,
  UpdatePostContext,
} from "../App";
export const Posts = ({ showOnly }) => {
  const loading = useContext(LoadingContext);
  let allPosts = useContext(AllPostContext);
  const likePost = useContext(LikePostContext);
  const dislikePost = useContext(DislikePostContext);
  const searchValue = useContext(SearchValueContext);
  const deletePost = useContext(DeletePostContext);
  const updatePost = useContext(UpdatePostContext);
  if (allPosts) {
    if (showOnly == "Liked") {
      allPosts = allPosts.filter((post) => post.liked);
    } else if (showOnly == "Disliked") {
      allPosts = allPosts.filter((post) => post.disliked);
    }
  }
  console.log(allPosts);
  const getHighlightedText = (text, highlight) => {
    if (highlight) {
      const parts = text.split(new RegExp(`(${highlight})`, "gi"));
      return (
        <span>
          {parts.map((part, i) => (
            <span
              key={i}
              style={
                part.toLowerCase() === highlight.toLowerCase()
                  ? { backgroundColor: "yellow" }
                  : {}
              }
            >
              {part}
            </span>
          ))}
        </span>
      );
    } else {
      return text;
    }
  };
  const createPosts = (post, index) => {
    return (
      <>
        <div className="container-div d-flex justify-content-center">
          <Card className="post-card m-3">
            <Card.Header>
              <div className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <div>
                    <AccountCircleOutlinedIcon style={{ fontSize: "250%" }} />
                  </div>
                  <div className="mx-2">
                    <div>
                      <b>{getHighlightedText(post.name, searchValue)}</b>
                    </div>
                    <div style={{ fontSize: "80%" }}>
                      Employee at{" "}
                      {getHighlightedText(post.companyName, searchValue)}
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div
                    onClick={() => {
                      updatePost(post.id);
                    }}
                  >
                    <EditIcon
                      className="mx-2"
                      style={{ fontSize: "200%", color: "gray" }}
                    />
                  </div>
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => deletePost(post.id)}
                  >
                    <DeleteRoundedIcon
                      className="mx-2"
                      style={{ fontSize: "200%", color: "#dc3545" }}
                    />
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <div>
                  <b>{getHighlightedText(post.title, searchValue)}</b>
                </div>
                <hr />
                <div style={{ fontSize: "80%" }}>
                  {getHighlightedText(post.body, searchValue)}
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between align-items-center">
                <div
                  // className={
                  //   post.liked ? "btn btn-success" : "btn btn-outline-success"
                  // }
                  onClick={() => likePost(post.id)}
                >
                  {post.liked ? (
                    <ThumbUpAltIcon
                      style={{ fontSize: "250%", color: "#198754" }}
                    />
                  ) : (
                    <ThumbUpAltOutlinedIcon style={{ color: "gray" }} />
                  )}
                </div>
                <div onClick={() => dislikePost(post.id)}>
                  {post.disliked ? (
                    <ThumbDownIcon
                      style={{ fontSize: "250%", color: "#dc3545" }}
                    />
                  ) : (
                    <ThumbDownAltOutlinedIcon style={{ color: "gray" }} />
                  )}
                </div>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </>
    );
  };
  return (
    <>
      {loading && <Loader />}
      {!loading && (
        <Container className="">{allPosts.map(createPosts)}</Container>
      )}
    </>
  );
};
