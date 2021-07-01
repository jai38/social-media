import { Card, Form, Button } from "react-bootstrap";
import AccountCircleOutlinedIcon from "@material-ui/icons/AccountCircleOutlined";

import React, { useRef } from "react";
import { useContext } from "react";
import { AllPostContext, ChangePostContext } from "../../App";
import { useHistory, useLocation } from "react-router";
import { useEffect } from "react";
import { useState } from "react";

export const CreatePost = () => {
  const history = useHistory();
  const nameRef = useRef();
  const companyNameRef = useRef();
  const titleRef = useRef();
  const bodyRef = useRef();
  const location = useLocation();
  const [currentPostId, setCurrentPostId] = useState(0);
  const allPosts = useContext(AllPostContext);
  useEffect(() => {
    if (location.state && location.state.postId) {
      allPosts.forEach((post) => {
        if (location.state.postId == post.id) {
          nameRef.current.value = post.name;
          companyNameRef.current.value = post.companyName;
          titleRef.current.value = post.title;
          bodyRef.current.value = post.body;
          setCurrentPostId(post.id);
        }
      });
    }
    console.log(currentPostId);
  }, []);
  const changePost = useContext(ChangePostContext);
  const handleChangePost = (event, postId) => {
    changePost(event, postId);
    history.push("home");
  };
  return (
    <>
      <Form onSubmit={(event) => handleChangePost(event, currentPostId)}>
        <div
          className="container-div d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <Card className="post-card">
            <Card.Header>
              <div className="d-flex justify-content-between">
                {/* <div className="d-flex align-items-center"> */}
                <div>
                  <AccountCircleOutlinedIcon style={{ fontSize: "250%" }} />
                </div>
                <div className="d-flex mx-2 justify-content-between w-100">
                  <div>
                    <Form.Control
                      ref={nameRef}
                      placeholder="Name"
                      name="name"
                    />
                  </div>
                  <div>
                    <Form.Control
                      placeholder="Company Name"
                      ref={companyNameRef}
                      name="companyName"
                    />
                  </div>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              <div>
                <div>
                  <Form.Control
                    placeholder="Title"
                    ref={titleRef}
                    name="title"
                  />
                </div>
                <hr />
                <div style={{ fontSize: "80%" }}>
                  <Form.Control
                    as="textarea"
                    ref={bodyRef}
                    name="body"
                    rows="10"
                    placeholder="Start Writing here . . ."
                  />
                </div>
              </div>
            </Card.Body>
            <Card.Footer>
              <div className="d-flex justify-content-between">
                <Button type="submit" className="btn btn-primary m-1">
                  Post
                </Button>
                <Button
                  className="btn btn-danger m-1"
                  onClick={() => history.goBack()}
                >
                  Cancel
                </Button>
              </div>
            </Card.Footer>
          </Card>
        </div>
      </Form>
    </>
  );
};
