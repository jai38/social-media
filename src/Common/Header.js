import React from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./header.css";
export const Header = () => {
  return (
    <>
      <Navbar expand="lg" className="header d-flex justify-content-between">
        <Navbar.Brand>
          <Link to="/home">Social Media</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/create">Create Post</Link>
            <Link to="/liked">Liked Posts</Link>
            <Link to="/disliked">Disliked Posts</Link>
          </Nav>
          <Form className="d-flex">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
