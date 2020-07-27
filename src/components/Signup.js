import React, { useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidate] = useState(false);

  const handleValidation = () => {
    validated && password !== '' ?
    handleSubmit():
    setValidate(true) };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = () => {
    axios.post('http://localhost:5000/adduser',{
      firstName,
      lastName,
      email,
      username,
      password,
    })
      .then((res) => {
        console.log(res);
        setShow(false);
        setValidate(false);
      })
      .catch((err) => console.log('Error on post request', err));
  }

  return (
    <>
    <Styles>
      <Button variant='primary' onClick={handleShow}>
        Sign-up
      </Button>

      <Modal show={show} onHide={handleClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Welcome to the fun!<br />Please fill out the form below to sign-up.
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form noValidate validated={validated}>
            <Form.Row>
              <Form.Group as={Col} controlId='formGridFirstName'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  required
                  type='firstName'
                  placeholder='First Name'
                  onChange={(e) => setFirstName(e.target.value)}/>
              </Form.Group>

              <Form.Group as={Col} controlId='formGridLastName'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  required
                  type='lastName'
                  placeholder='Last Name'
                  onChange={(e) => setLastName(e.target.value)}/>
              </Form.Group>
            </Form.Row>

            <Form.Group controlId='formGridEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Enter email'
                onChange={(e) => setEmail(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId='formGridUsername'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type='username'
                placeholder='Username'
                onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}/>
              <Form.Text id="passwordHelpBlock" muted>
                Your password must be 8-20 characters long, contain letters and numbers, and
                must not contain spaces, special characters, or emojis.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId='formGridReEnterPassword'>
              <Form.Label>Re-enter Password</Form.Label>
              <Form.Control required type='password' placeholder='Re-enter password' />
            </Form.Group>

            <Form.Group>
              <Form.Check
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
        <Form.Text id="goToLogin" className='mr-auto' onClick={handleClose} muted>
            Already a member? Login.
          </Form.Text>
          <Button variant='secondary' onClick={handleClose}>
            Cancel
          </Button>
          <Button variant='primary' onClick={handleValidation}>
            Sign-up
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
    </>
  )
}