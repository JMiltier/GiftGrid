import React, { useState } from 'react';
import { Nav, Navbar, Figure, NavDropdown } from 'react-bootstrap';
import { Login } from './Login.js';
import { Signup } from './Signup.js';
import styled from 'styled-components';
import logo from '../assets/icon.svg';
import { GiftGridComplete } from './GiftGridComplete.js';

const Styles = styled.div`
  .navbar {
    background-color: #222;
    vertical-align: middle;
  }

  .navbar-brand {
    font-size: 32px;
    padding: 0 !important;
  }

  .figure {
    width: 20px;
    height: 20px;
    margin-right: 10px;

    &:hover {
      fill: white !important;
    }
  }

  .navbar-brand, .navbar-nav .nav-link {
    color: #bbb;
    vertical-align: middle;

    &:hover {
      color: white;
    }

    &:active {
      color: #bbb,
    }
  }

  .nav-item {
    padding: 0 5px;
  }
`;

export const NavigationBar = (props) => {
  const [authentication, setAuthentication] = useState(false);

  return (
    <Styles>
      <Navbar expand='md'>
        <Navbar.Brand href='/'>
          <Figure>
            <Figure.Image alt='logo' src={logo} />
          </Figure>
          Gift Grid
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='navbar-nav'>
            {/* <Nav.Item><Nav.Link href='/'></Nav.Link></Nav.Item> */}
            {authentication ?
            <Nav defaultActiveKey='/' className='ml-auto'>
              <NavDropdown title='Profile' id='dropdown-button' className='navdropdown'>
                <Nav.Item><Nav.Link href='/settings'>Settings</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href='/grids'>Grids</Nav.Link></Nav.Item>
                <Nav.Item><Nav.Link href='/logout'>Logout</Nav.Link></Nav.Item>
              </NavDropdown>
            </Nav>
            :
            <Nav defaultActiveKey='/' className='ml-auto'>
              <Nav.Item><Login setAuthentication={setAuthentication}/></Nav.Item>
              <Nav.Item><Signup /></Nav.Item>
            </Nav>
            }

        </Navbar.Collapse>
      </Navbar>
      <GiftGridComplete className='align-middle'/>
    </Styles>
  )
}
