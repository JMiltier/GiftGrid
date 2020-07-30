import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

export const Logout = () => {
  const [show, setShow] = useState(false);

  const handleLogoutShow = () => setShow(true);
  const handleLogoutClose = () => setShow(false);
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
          <Button variant="primary" onClick={handleLogoutClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

