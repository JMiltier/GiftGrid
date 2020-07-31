import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

export const Logout = () => {
  const [show, setShow] = useState(false);

  const handleLogoutShow = () => setShow(true);
  const handleLogoutClose = () => setShow(false);

  const handleLogout = () => {
    axios.get('http://localhost:5000/userlogout', {
      params: {
        username: 'giftgridOG'
      }
    })
      .then(setShow(false))
      .then(window.location.reload(true))
      .catch((err) => console.log('Auth error', err));
  }

  return (
    <>
    <div onClick={handleLogoutShow}>Logout</div>
      <Modal size='sm' show={show} onHide={handleLogoutClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You've been logged out.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleLogout}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

