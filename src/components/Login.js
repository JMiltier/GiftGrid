import React, { useState } from 'react';
import { Button, Modal, Form, Container, Tooltip, OverlayTrigger } from 'react-bootstrap';
import styled from 'styled-components';
import axios from 'axios';

const Styles = styled.div`
  .navbar {
    background-color: #222;
  }

  .login-button {
    background-color: rgb(70,130,130);
    border: black;
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;

    &:hover {
      color: white;
    }
  }

  .tooltip .tooltip-inner {
    background-color: red;
  }
`;

export const Login = () => {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(false);

  const submitLogin = () => {
    if (username !== '' && password !== '') {
      axios.get('http://localhost:5000/user', {
        params: {
          username,
          password
        }
      })
        .then(() => {
          setShow(false);
          setAuth(true);
          setUsername('');
          setPassword('');
          axios.get('http://localhost:5000/userlogin', {
            params: {
              username: 'giftgridOG'
            }
          })
            .then((res) => setAuth(true))
            .then(window.location.reload(true))
            .catch((err) => console.log('Auth error', err));
        })
        .catch((err) => {
          console.log('Error getting user during login', err)
          setLoginError(true);
          setAuth(false);
          setUsername('');
          setPassword('');
          setTimeout(() => {setLoginError(false)}, 2000);
        });
    } else {
      setShow(true);
      setAuth(true);
    }
  }

  const handleLoginClose = () => setShow(false);
  const handleLoginShow = () => {setShow(true); setAuth(false)};

  return (
    <Container>
    <Styles>
      <Button className='login-button' variant='primary' onClick={handleLoginShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleLoginClose} backdrop='static' keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Welcome back, please sign in.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form noValidate validated={auth}>
            <Form.Group controlId='formBasic'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type='username'
                value={username}
                placeholder='Enter username'
                onChange={e => setUsername(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please input a username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label htmlFor='inputPassword5'>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                value={password}
                id='inputPassword5'
                aria-describedby='passwordHelpBlock'
                onChange={e => setPassword(e.target.value)}
              />
              <Form.Control.Feedback type='invalid'>
                Please input a password.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
        <Form.Check className='mr-auto' label='Remember me' />
          <Button variant='secondary' onClick={handleLoginClose}>
            Cancel
          </Button>
          <OverlayTrigger
            show={loginError}
            placement='right'
            overlay={<Tooltip>
              Invalid credentials.
            </Tooltip>}>
            <Button variant='primary' onClick={submitLogin}>
              Login
            </Button>
          </OverlayTrigger>
          {/* <Modal
            show={loginError}
            onHide={handleLoginError}
            style={{'backgroundColor': 'lightyellow'}}
            backdrop='static'
            keyboard={false}
            variant='danger'
          >
              <Modal.Header>
                <strong className='mc-auto'>Invalid login.</strong>
              </Modal.Header>
              <Modal.Body>Username and password combination not found.</Modal.Body>
              <Modal.Footer>
                <Button variant='danger' onClick={handleLoginError}>
                  OK
                </Button>
              </Modal.Footer>
            </Modal> */}
        </Modal.Footer>
      </Modal>
    </Styles>
    </Container>
  )
}


