import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
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

export const Login = (props) => {
  const [show, setShow] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [authentication, setAuthentication] = useState(false);

  const submitLogin = () => {
    if (username !== '' && password !== '') {
      setShow(false);
      setLogin(false);
      axios.get('http://localhost:5000/user', {
        params: {
          username,
          password
        }
      })
        .then(() => setAuthentication(true))
        .catch((err) => console.log('Error getting user during login', err));
    } else {
      setShow(true);
      setLogin(true);
    }
  }

  const handleLoginClose = () => setShow(false);
  const handleLoginShow = () => setShow(true);

  return (
    <>
    <Styles>
      <Button variant="primary" onClick={handleLoginShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleLoginClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome back, please sign in.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={login}>
            <Form.Group controlId='formBasic'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type='username'
                placeholder='Enter username'
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please input a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor="inputPassword5">Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                id="inputPassword5"
                aria-describedby="passwordHelpBlock"
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type="invalid">
                Please input a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Form.Check className='mr-auto' label="Remember me" />
          <Button variant="secondary" onClick={handleLoginClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </Styles>
    </>
  )
}