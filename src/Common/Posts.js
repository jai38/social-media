import React, { useContext, useEffect } from "react";
import { Container, Card } from "react-bootstrap";
import { Loader } from "./Loader";
import {
  AllPostContext,
  dislikePostContext,
  likePostContext,
  loadingContext,
} from "../App";
export const Posts = ({ showOnly }) => {
  const loading = useContext(loadingContext);
  let allPosts = useContext(AllPostContext);
  const likePost = useContext(likePostContext);
  const dislikePost = useContext(dislikePostContext);
  if (allPosts) {
    if (showOnly == "Liked") {
      allPosts = allPosts.filter((post) => post.liked);
    } else if (showOnly == "Disliked") {
      allPosts = allPosts.filter((post) => post.disliked);
    }
  }
  const createPosts = (post, index) => {
    return (
      <>
        <div className="d-flex justify-content-center">
          <Card className="m-3 w-50">
            <Card.Header>
              <div>
                <b>By {post.name}</b>
              </div>
              <div style={{ fontSize: "80%" }}>
                Employee at {post.companyName}
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <div>
                  <b>{post.title}</b>
                </div>
                <hr />
                <div style={{ fontSize: "80%" }}>{post.body}</div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <div
                  className={
                    post.liked ? "btn btn-success" : "btn btn-outline-success"
                  }
                  onClick={() => likePost(post.id)}
                >
                  Like
                </div>
                <div
                  className={
                    post.disliked ? "btn btn-danger" : "btn btn-outline-danger"
                  }
                  onClick={() => dislikePost(post.id)}
                >
                  Dislike
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
