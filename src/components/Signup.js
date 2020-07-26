import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import styled from 'styled-components';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }
`;

export const Signup = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    <Styles>
      <Button variant='primary' onClick={handleShow}>
        Sign-up
      </Button>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome to the fun!<br />Please fill out the form below.</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Row>
              <Form.Group as={Col} controlId='formGrid'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='firstName' placeholder='First Name' />
              </Form.Group>

              <Form.Group as={Col} controlId='formGridPassword'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='lastName' placeholder='Last Name' />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='formGridEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control type='email' placeholder='Enter email' />
            </Form.Group>

            <Form.Group controlId='formGridUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control type='username' placeholder='Username' />
            </Form.Group>

            <Form.Group controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>

            <Form.Group controlId='formGridReEnterPassword'>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleClose}>
            Sign-up
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
    </>
  )
}