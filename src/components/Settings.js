import React from 'react';
import { Container, Image, Button } from 'react-bootstrap';
import avatar from '../assets/generic-avatar.jpg';
import styled from 'styled-components';
import axios from 'axios';

const Styles = styled.div`
  .rounded-circle {
    height: 150px;
    width: auto;
  }
`;

export const Settings = () => {
  const username = 'giftgridOG';

  const handleDeleteAll= () => {
    axios.post('http://localhost:5000/deleteall', {username})
    .then(()=>console.log('All grids deleted'))
    .catch(() => console.log('Unable to delete all grids'));
  }

  return (
    <Container>
      <Styles>
        <Image src={avatar} roundedCircle />
        <p><h3>giftgridOG</h3></p>
        <br/><br/><br/><br/><br/><br/><br/>
        <Button variant="danger" onClick={handleDeleteAll}>
          DELETE ACCOUNT
        </Button>
      </Styles>
    </Container>
  )
}