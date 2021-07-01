import { CloseOutlined } from "@material-ui/icons";
import React, { useContext, useState } from "react";
import { Alert, Modal, Button } from "react-bootstrap";
import { ChangeMessageContext, MessageContext } from "../../App";
import { Header } from "../../Common/Header";
import { Posts } from "../../Common/Posts";
export const Home = () => {
  const message = useContext(MessageContext);
  const changeMessage = useContext(ChangeMessageContext);
  const [show, setShow] = useState(true);
  const handleClose = () => {
    changeMessage("");
    setShow(false);
  };
  return (
    <div>
      <Header />
      {message && (
        <>
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div className="d-flex justify-content-between">
                <Modal.Title>{message}</Modal.Title>
                <button className="btn" onClick={handleClose}>
                  <CloseOutlined />
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </>
      )}
      <Posts showOnly={"All"} />
    </div>
  );
};
