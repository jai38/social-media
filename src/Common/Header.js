import React, { useContext } from "react";
import { useRef } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { SearchContext, SearchValueContext } from "../App";
import "./header.css";
export const Header = () => {
  const searchRef = useRef();
  const search = useContext(SearchContext);
  const searchValue = useContext(SearchValueContext);
  return (
    <>
      <Navbar expand="lg" className="header d-flex justify-content-between">
        <Navbar.Brand>
          <Link to="/home">Social Media</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/create" className="header-links btn btn-outline-primary">
              Create Post
            </Link>
            <Link to="/liked" className="header-links btn btn-outline-success">
              Liked Posts
            </Link>
            <Link
              to="/disliked"
              className="header-links btn btn-outline-danger"
            >
              Disliked Posts
            </Link>
          </Nav>
          <Form className="d-flex">
            <FormControl
              type="text"
              ref={searchRef}
              onChange={() => search(searchRef.current.value)}
              placeholder="Search by anything . . ."
              className="mr-sm-2"
            />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};
